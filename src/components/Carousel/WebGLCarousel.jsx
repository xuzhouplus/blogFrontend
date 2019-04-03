import React from 'react';
import TweenMax from 'gsap';
import * as THREE from 'three';
import ImagesLoaded from 'imagesloaded';
import picture1 from '../../images/Carousel/1.jpg';
import picture2 from '../../images/Carousel/2.jpg';
import picture3 from '../../images/Carousel/3.jpg';
import picture4 from '../../images/Carousel/4.jpg';
import picture5 from '../../images/Carousel/5.jpg';
import picture6 from '../../images/Carousel/6.jpg';
import './WebGLCarousel.css';

class WebGlCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {interval: null};
	}

	renderCarousel() {
		let webGLCarouselComponent = this;
		let displacementSlider = function displacementSlider(opts) {

			let vertex = '\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }\n    ';

			let fragment = '\n        \n        varying vec2 vUv;\n\n        uniform sampler2D currentImage;\n        uniform sampler2D nextImage;\n\n        uniform float dispFactor;\n\n        void main() {\n\n            vec2 uv = vUv;\n            vec4 _currentImage;\n            vec4 _nextImage;\n            float intensity = 0.3;\n\n            vec4 orig1 = texture2D(currentImage, uv);\n            vec4 orig2 = texture2D(nextImage, uv);\n            \n            _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));\n\n            _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));\n\n            vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);\n\n            gl_FragColor = finalTexture;\n\n        }\n    ';

			let images = opts.images,
				image = void 0,
				sliderImages = [];
			let canvasWidth = images[0].clientWidth;
			let canvasHeight = images[0].clientHeight;
			let parent = opts.parent;

			let renderWidth = Math.max(parent.clientWidth, window.innerWidth || 0);
			let renderHeight = Math.max(parent.clientHeight, window.innerHeight || 0);

			let renderW = void 0,
				renderH = void 0;

			if (renderWidth > canvasWidth) {
				renderW = renderWidth;
			} else {
				renderW = canvasWidth;
			}

			renderH = canvasHeight;

			let renderer = new THREE.WebGLRenderer({
				antialias: false
			});

			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setClearColor(0x23272A, 1.0);
			renderer.setSize(renderW, renderH);
			parent.appendChild(renderer.domElement);

			let loader = new THREE.TextureLoader();
			loader.crossOrigin = "anonymous";

			images.forEach(function (img) {
				image = loader.load(img.getAttribute('src'));
				image.magFilter = image.minFilter = THREE.LinearFilter;
				image.anisotropy = renderer.capabilities.getMaxAnisotropy();
				sliderImages.push(image);
			});

			let scene = new THREE.Scene();
			scene.background = new THREE.Color(0x23272A);
			let camera = new THREE.OrthographicCamera(renderWidth / -2, renderWidth / 2, renderHeight / 2, renderHeight / -2, 1, 1000);

			camera.position.z = 1;

			let mat = new THREE.ShaderMaterial({
				uniforms: {
					dispFactor: {type: "f", value: 0.0},
					currentImage: {type: "t", value: sliderImages[0]},
					nextImage: {type: "t", value: sliderImages[1]}
				},
				vertexShader: vertex,
				fragmentShader: fragment,
				transparent: true,
				opacity: 1.0
			});

			let geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
			let object = new THREE.Mesh(geometry, mat);
			object.position.set(0, 0, 0);
			scene.add(object);

			let isAnimating = false;

			let render = function (slideId) {
				pageIndex = slideId;
				if (!isAnimating) {
					isAnimating = true;
					document.getElementById('pagination').querySelectorAll('.active')[0].className = '';
					document.getElementById('pagination').querySelectorAll('button')[pageIndex].className = 'active';
					mat.uniforms.nextImage.value = sliderImages[slideId];
					mat.uniforms.nextImage.needsUpdate = true;

					TweenMax.to(mat.uniforms.dispFactor, 1, {
						value: 1,
						ease: 'Expo.easeInOut',
						onComplete: function onComplete() {
							mat.uniforms.currentImage.value = sliderImages[slideId];
							mat.uniforms.currentImage.needsUpdate = true;
							mat.uniforms.dispFactor.value = 0.0;
							isAnimating = false;
						}
					});

					let slideTitleEl = document.getElementById('slide-title');
					let slideStatusEl = document.getElementById('slide-status');
					let nextSlideTitle = document.querySelectorAll('[data-slide-title="' + slideId + '"]')[0].innerHTML;
					let nextSlideStatus = document.querySelectorAll('[data-slide-status="' + slideId + '"]')[0].innerHTML;

					TweenMax.fromTo(slideTitleEl, 0.5, {
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

							TweenMax.to(slideTitleEl, 0.5, {
								autoAlpha: 1,
								filter: 'blur(0px)',
								y: 0
							});
						}
					});

					TweenMax.fromTo(slideStatusEl, 0.5, {
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

							TweenMax.to(slideStatusEl, 0.5, {
								autoAlpha: 1,
								filter: 'blur(0px)',
								y: 0,
								delay: 0.1
							});
						}
					});
				}
			};
			let pageIndex = 0;
			let loop = function () {
				let pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));
				let interval = setInterval(function () {
					pageIndex++;
					pageIndex = parseInt(pageIndex % pagButtons.length);
					render(pageIndex);
				}, 5000);
				webGLCarouselComponent.setState({
					interval: interval
				});
			};
			let addEvents = function addEvents() {

				let pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));

				pagButtons.forEach(function (el) {

					el.addEventListener('click', function () {
						let slideId = parseInt(this.dataset.slide, 10);
						render(slideId);
					});
				});
			};

			addEvents();

			window.addEventListener('resize', function (e) {
				renderer.setSize(renderW, renderH);
			});

			let animate = function animate() {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			};
			animate();
			loop();
		};

		let sliderContainer = document.getElementById('slider');
		let carouselImages = sliderContainer.querySelectorAll('img');
		ImagesLoaded(carouselImages, function () {
			let sliderImagesArray = Array.from(carouselImages);
			new displacementSlider({
				parent: sliderContainer,
				images: sliderImagesArray
			});
		});
	}

	componentDidMount() {
		this.renderCarousel();
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);
	}

	render() {
		return (
			<div className="section row carousel">
				<div className="col-md-12 col-sm-12">
					<main>
						<div id="slider">
							<div className="slider-inner">
								<div id="slider-content">
									<div className="meta">Position</div>
									<h2 id="slide-title">华山</h2>
									<div className="meta">Location</div>
									<div id="slide-status">华阴</div>
									<span data-slide-title="0">华山</span>
									<span data-slide-title="1">阆中古城</span>
									<span data-slide-title="2">兴隆湖</span>
									<span data-slide-title="3">电子科技大学</span>
									<span data-slide-title="4">峨眉山</span>
									<span data-slide-title="5">颐和园</span>
									<span data-slide-status="0">华阴</span>
									<span data-slide-status="1">阆中</span>
									<span data-slide-status="2">成都</span>
									<span data-slide-status="3">成都</span>
									<span data-slide-status="4">峨眉山</span>
									<span data-slide-status="5">北京</span>
								</div>
							</div>

							<img alt="img1" src={picture1}/>
							<img alt="img2" src={picture2}/>
							<img alt="img3" src={picture3}/>
							<img alt="img4" src={picture4}/>
							<img alt="img5" src={picture5}/>
							<img alt="img6" src={picture6}/>

							<div id="pagination">
								<button className="active" data-slide="0">
								</button>
								<button data-slide="1">
								</button>
								<button data-slide="2">
								</button>
								<button data-slide="3">
								</button>
								<button data-slide="4">
								</button>
								<button data-slide="5">
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default WebGlCarousel;