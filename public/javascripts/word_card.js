var displacementSlider = function displacementSlider(opts) {

    var vertex = '\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }\n    ';

    var fragment = '\n        \n        varying vec2 vUv;\n\n        uniform sampler2D currentImage;\n        uniform sampler2D nextImage;\n\n        uniform float dispFactor;\n\n        void main() {\n\n            vec2 uv = vUv;\n            vec4 _currentImage;\n            vec4 _nextImage;\n            float intensity = 0.3;\n\n            vec4 orig1 = texture2D(currentImage, uv);\n            vec4 orig2 = texture2D(nextImage, uv);\n            \n            _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));\n\n            _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));\n\n            vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);\n\n            gl_FragColor = finalTexture;\n\n        }\n    ';

    var images = opts.images,
        image = void 0,
        sliderImages = [];;
    var canvasWidth = images[0].clientWidth;
    var canvasHeight = images[0].clientHeight;
    var parent = opts.parent;
    var renderWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var renderHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var renderW = void 0,
        renderH = void 0;

    if (renderWidth > canvasWidth) {
        renderW = renderWidth;
    } else {
        renderW = canvasWidth;
    }

    renderH = canvasHeight;

    var renderer = new THREE.WebGLRenderer({
        antialias: false
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x23272A, 1.0);
    renderer.setSize(renderW, renderH);
    parent.appendChild(renderer.domElement);

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    images.forEach(function (img) {

        image = loader.load(img.getAttribute('src') + '?v=' + Date.now());
        image.magFilter = image.minFilter = THREE.LinearFilter;
        image.anisotropy = renderer.capabilities.getMaxAnisotropy();
        sliderImages.push(image);
    });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x23272A);
    var camera = new THREE.OrthographicCamera(renderWidth / -2, renderWidth / 2, renderHeight / 2, renderHeight / -2, 1, 1000);

    camera.position.z = 1;

    var mat = new THREE.ShaderMaterial({
        uniforms: {
            dispFactor: { type: "f", value: 0.0 },
            currentImage: { type: "t", value: sliderImages[0] },
            nextImage: { type: "t", value: sliderImages[1] }
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
    });

    var geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
    var object = new THREE.Mesh(geometry, mat);
    object.position.set(0, 0, 0);
    scene.add(object);


    var isAnimating = false;
    var scroll = function(slideId){
        if (!isAnimating) {
            isAnimating = true
            var pagination = document.getElementById('pagination')
            var nowPagination = pagination.querySelectorAll('.active')[0]
            var button = pagination.querySelectorAll("button")

            var i;
            for (i = button.length - 1; i >= 0; i--) {
                if (parseInt(button[i].dataset.slide, 10)==slideId) {
                    nowPagination.className = '';
                    button[i].className = 'active';
                    mat.uniforms.nextImage.value = sliderImages[slideId];
                    mat.uniforms.nextImage.needsUpdate = true;

                    TweenLite.to(mat.uniforms.dispFactor, 1/2, {
                        value: 1,
                        ease: 'Expo.easeInOut',
                        onComplete: function onComplete() {
                            mat.uniforms.currentImage.value = sliderImages[slideId];
                            mat.uniforms.currentImage.needsUpdate = true;
                            mat.uniforms.dispFactor.value = 0.0;
                            isAnimating = false;
                        }
                    });
                    // 过渡动画
                    var slideTitleEl = document.getElementById('slide-title');
                    var slideStatusEl = document.getElementById('slide-status');
                    var nextSlideTitle = document.querySelectorAll('[data-slide-title="' + slideId + '"]')[0].innerHTML;
                    var nextSlideStatus = document.querySelectorAll('[data-slide-status="' + slideId + '"]')[0].innerHTML;

                    TweenLite.fromTo(slideTitleEl, 0.5/2, {
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        y: 0
                    }, {
                        autoAlpha: 0,
                        filter: 'blur(10px)',
                        y: 20,
                        ease: 'Expo.easeIn',
                        onComplete: function onComplete() {
                            slideTitleEl.innerHTML = nextSlideTitle;

                            TweenLite.to(slideTitleEl, 0.5/2, {
                                autoAlpha: 1,
                                filter: 'blur(0px)',
                                y: 0
                            });
                        }
                    });

                    TweenLite.fromTo(slideStatusEl, 0.5/2, {
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        y: 0
                    }, {
                        autoAlpha: 0,
                        filter: 'blur(10px)',
                        y: 20,
                        ease: 'Expo.easeIn',
                        onComplete: function onComplete() {
                            slideStatusEl.innerHTML = nextSlideStatus;

                            TweenLite.to(slideStatusEl, 0.5/2, {
                                autoAlpha: 1,
                                filter: 'blur(0px)',
                                y: 0,
                                delay: 0.1/2
                            });
                        }
                    });
                    // 过渡动画结束
                    break;
                }
            }
            if (i<0) {isAnimating = false;}
        }
    }

    var addEvents = function addEvents() {

        var pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));
        var isAnimating = false;

        $('body').on('mousewheel', function(event) {
            var pagination = document.getElementById('pagination')
            var nowPagination = pagination.querySelectorAll('.active')[0]
            var slideId = parseInt(nowPagination.dataset.slide, 10);
            if (event.originalEvent.wheelDelta<0) {
                slideId++;
            }else{
                slideId--;
            }
            scroll(slideId);  
        });

        pagButtons.forEach(function (el) {
            // console.log(el)

            el.addEventListener('click', function () {
                var slideId = parseInt(this.dataset.slide, 10);
                scroll(slideId)
            });
        });
    };

    addEvents();

    window.addEventListener('resize', function (e) {
        renderer.setSize(renderW, renderH);
    });

    var animate = function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();
};

imagesLoaded(document.querySelectorAll('img'), function () {

    document.body.classList.remove('loading');

    var el = document.getElementById('slider');
    var imgs = Array.from(el.querySelectorAll('img'));
    new displacementSlider({
        parent: el,
        images: imgs
    });
});