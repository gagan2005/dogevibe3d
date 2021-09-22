import * as THREE from "https://cdn.skypack.dev/three@0.120.1";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";
const cameraX=40;
const cameraY=20;
const cameraZ=40;
const rad = Math.sqrt(cameraZ*cameraZ + cameraY*cameraY);
let partyVariation;
/**
 * y = rad*sin theta
 * z = rad*cos theta
 */
let theta =  Math.atan(cameraY/cameraZ);

const mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

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
  
  let sign = +1;

  

  
  // alert(partyVariation);
  console.log(partyVariation);
  // let mesh;

  initScene();
  initBox();
  initLights();
  initPlane();
  animate();
  window.t = THREE;

  function initPlane() {
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
  }
  function initScene() {
    scene = new THREE.Scene();
    window.scene = scene;
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 40;
    camera.position.x = 40;
    camera.position.y = 20;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    let appele = document.getElementById("app");
    appele.style.height = window.innerHeight.toString() + "px";
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
    scene.fog = new THREE.Fog(new THREE.Color(0, 0, 0.2), 10, 100);

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
    mesh.specular = new THREE.Color("red");
    // mesh.position.z = -50;
    mesh.position.y = 5;
    scene.add(mesh);
  }

  function initLights() {
    const sphere = new THREE.SphereGeometry(0.5, 16, 8);

    light1 = new THREE.SpotLight(0x000040, 1, 0);

    // light1.add(
    //   new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({ color: 0x000040 }))
    // );
    window.light = light1;
    light1.position.set(0, 20, 20);
    light1.castShadow = true;
    scene.add(light1);

    light2 = new THREE.SpotLight(0x000040, 1, 0);

    // light2.add(
    //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x000040 }))
    // );
    light2.position.set(20, 20, 0);

    scene.add(light2);

    scene.add(new THREE.AmbientLight(0xff0000, 0.4));
    light1.target = mesh;
    light2.target = mesh;
  }


  function animate() {
    // mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.02;
   theta+=sign*0.005;
   if(theta > 3)sign = -1;
   if(theta < 0.1)sign=+1;
    
    console.log(theta);
    // console.log(rad*Math.cos(theta));
    camera.position.z = rad*Math.cos(theta);
    camera.position.x = camera.position.z;
    camera.position.y=rad*Math.sin(theta);
    // camera.position.y+=0.2;
    camera.updateProjectionMatrix();
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

    let p2 = giveRandomColor();
    light1.color = p;
    light2.color = p2;

    setTimeout(randomLights, 500 + Math.random() * 1500);
  }

  function partyy() {
    party.confetti(document.getElementById("app"), {
      shapes: ["square", "circle", "roundedRectangle"],
      count: party.variation.range(partyVariation, 2 * partyVariation),
      size: party.variation.range(0.1, 0.3),
    });
    setTimeout(partyy, 2000);
  }
  function giveRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
  }

  setTimeout(randomLights, 1000);
  partyy();
}
function Start() {
  App();
}

document.getElementById("but").addEventListener("click", () => {
  document.getElementById("audio").play();
  document.getElementById("but").style.display = "none";
  
  if (mobileCheck()===true) partyVariation = 10;
  else partyVariation = 200;
  Start();
});

// App();
