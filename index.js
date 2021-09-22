import * as THREE from "https://cdn.skypack.dev/three@0.120.1";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";

function App() {
  var camera;
  var scene;
  var renderer;
  var mesh;
  var videoTexture;
  var video;
  var stats;
  let controls;
  let light1, light2;
  // let mesh;

  initScene();
  initBox();
  initLights();
  initPlane();
  animate();
  window.t=THREE;

  function initPlane(){

    const geometry = new THREE.PlaneGeometry( 1000, 1000 );
    const material = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x=Math.PI/2;
scene.add( plane );
  }
  function initScene() {
    scene = new THREE.Scene();
    window.scene=scene;
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 30;
    camera.position.x = 30;
    camera.position.y = 15;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    let appele = document.getElementById("app");
    appele.style.height=window.innerHeight.toString()+"px";
    document.getElementById("app").appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    controls = new OrbitControls(camera, renderer.domElement);
    render();
  }

  function initBox() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    const axesHelper = new THREE.AxesHelper(50);
    // scene.add(axesHelper);
    // scene.background = new THREE.Color('white');
    scene.fog = new THREE.Fog(new THREE.Color(0,0,0.2), 10, 100);
    
    video = document.getElementById("video");
    videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    let video2 = document.getElementById("video2");
    let videoTexture2 = new THREE.VideoTexture(video2);
    videoTexture2.minFilter = THREE.LinearFilter;
    videoTexture2.magFilter = THREE.LinearFilter;
    videoTexture2.format = THREE.RGBFormat;
    let videoTextures = [
      videoTexture,
      videoTexture,
      videoTexture,
      videoTexture2,
      videoTexture2,
      videoTexture2,
    ];
    let materials = [];
    for (let i = 0; i < 6; i++)
      materials.push(new THREE.MeshLambertMaterial({ map: videoTextures[i] }));
    // var material = new THREE.MeshBasicMaterial({map:videoTexture});

    mesh = new THREE.Mesh(geometry, materials);
    mesh.emissive = new THREE.Color(0xff0000);
    mesh.specular=new THREE.Color('red')
    // mesh.position.z = -50;
    mesh.position.y=5;
    scene.add(mesh);
  
  }

  function initLights() {

    const sphere = new THREE.SphereGeometry(0.5, 16, 8);

    light1 = new THREE.SpotLight(0x000040, 1, 0);

    // light1.add(
    //   new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({ color: 0x000040 }))
    // );
    window.light=light1;
    light1.position.set(0, 15, 15);
    light1.castShadow = true;
    scene.add(light1);

    light2 = new THREE.SpotLight(0x000040, 1, 0);

    // light2.add(
    //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x000040 }))
    // );
    light2.position.set(15, 15, 0);
    
    scene.add(light2);

    scene.add(new THREE.AmbientLight(0xff0000, 0.2));
    light1.target=mesh;
    light2.target=mesh;
  }

  function animate() {
    // mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.02;
    controls.update();

    render();

    requestAnimationFrame(animate);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  function randomLights() {
    let p = giveRandomColor();

    let p2= giveRandomColor();
    light1.color = p;
    light2.color = p2;
    setTimeout(randomLights, 500+Math.random()*1500);

    party.confetti(document.getElementById("app"), {
      shapes: ["square", "circle", "roundedRectangle"],
      count: party.variation.range(200, 400),
      size: party.variation.range(0.1, 0.3),
    });
  }
  function giveRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
  }

  setTimeout(randomLights, 1000);
}
function Start(){
  document.getElementById('audio').play();
  App();
}

document.getElementById('but').addEventListener('click',()=>{
  document.getElementById('but').style.display='none';
  Start();
  
})




// App();