/**
 * dat.globe Javascript WebGL Globe Toolkit
 * http://dataarts.github.com/dat.globe
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var DAT = DAT || {};

DAT.Globe = function (container, colorFn) {
  colorFn =
    colorFn ||
    function (x) {
      var c = new THREE.Color();
      c.setHSL(0.6 - x * 0.5, 1.0, 0.5);
      return c;
    };

  var Shaders = {
    earth: {
      uniforms: {
        texture: { type: "t", value: null },
      },
      vertexShader: [
        "varying vec3 vNormal;",
        "varying vec2 vUv;",
        "void main() {",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "vNormal = normalize( normalMatrix * normal );",
        "vUv = uv;",
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform sampler2D texture;",
        "varying vec3 vNormal;",
        "varying vec2 vUv;",
        "void main() {",
        "vec3 diffuse = texture2D( texture, vUv ).xyz;",
        "float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );",
        "vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );",
        "gl_FragColor = vec4( diffuse + atmosphere, 1.0 );",
        "}",
      ].join("\n"),
    },
    atmosphere: {
      uniforms: {},
      vertexShader: [
        "varying vec3 vNormal;",
        "void main() {",
        "vNormal = normalize( normalMatrix * normal );",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}",
      ].join("\n"),
      fragmentShader: [
        "varying vec3 vNormal;",
        "void main() {",
        "float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 0 );",
        "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;",
        "}",
      ].join("\n"),
    },
  };

  var camera, scene, renderer, w, h;
  var mesh, atmosphere, point;

  var overRenderer;

  // var imgDir = '';

  var curZoomSpeed = 0;
  var zoomSpeed = 50;

  var mouse = { x: 0, y: 0 },
    mouseOnDown = { x: 0, y: 0 };
  var rotation = { x: 0, y: 0 },
    target = { x: Math.PI * 1.7, y: Math.PI / 5.0 },
    targetOnDown = { x: 0, y: 0 };

  var distance = 100000,
    distanceTarget = 100000;
  var padding = 40;
  var PI_HALF = Math.PI / 2;

  var ROTATIONSPEED = 0.003;
  var k = ROTATIONSPEED;
  var f = false;

  // function init() {
  //   container.style.color = "#fff";
  //   container.style.font = "13px/20px Arial, sans-serif";

  //   var shader, uniforms, material;
  //   w = container.offsetWidth || window.innerWidth;
  //   h = container.offsetHeight || window.innerHeight;

  //   camera = new THREE.PerspectiveCamera(26, w / h, 1, 10000);
  //   camera.position.z = distance;

  //   scene = new THREE.Scene();

  //   var geometry = new THREE.SphereGeometry(150, 40, 30);

  //   shader = Shaders["earth"];
  //   uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  //   uniforms["texture"].value = THREE.ImageUtils.loadTexture(
  //     "./assets/images/world.jpg"
  //   );
  //   uniforms["texture"].value.transparent = true;
  //   uniforms["texture"].value.opacity = 0.01; // Adjust opacity as needed

  //   material = new THREE.ShaderMaterial({
  //     uniforms: uniforms,
  //     vertexShader: shader.vertexShader,
  //     fragmentShader: shader.fragmentShader,
  //   });

  //   mesh = new THREE.Mesh(geometry, material);
  //   mesh.rotation.y = Math.PI;
  //   scene.add(mesh);

  //   shader = Shaders["atmosphere"];
  //   uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  //   material = new THREE.ShaderMaterial({
  //     uniforms: uniforms,
  //     vertexShader: shader.vertexShader,
  //     fragmentShader: shader.fragmentShader,
  //     side: THREE.BackSide,
  //     blending: THREE.AdditiveBlending,
  //     transparent: true,
  //   });

  //   mesh = new THREE.Mesh(geometry, material);
  //   mesh.scale.set(1.1, 1.1, 1.1);
  //   scene.add(mesh);

  //   geometry = new THREE.CubeGeometry(0.75, 0.75, 1);
  //   geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

  //   point = new THREE.Mesh(geometry);

  //   renderer = new THREE.WebGLRenderer({ antialias: true });
  //   renderer.setSize(2400, 1200);
  //   // renderer.setSize(w, h);

  //   renderer.domElement.style.position = "absolute";

  //   container.appendChild(renderer.domElement);

  //   container.addEventListener("mousedown", onMouseDown, false);

  //   // container.addEventListener("mousewheel", onMouseWheel, false);

  //   document.addEventListener("keydown", onDocumentKeyDown, false);

  //   window.addEventListener("resize", onWindowResize, false);

  //   container.addEventListener(
  //     "mouseover",
  //     function () {
  //       overRenderer = true;
  //     },
  //     false
  //   );

  //   container.addEventListener(
  //     "mouseout",
  //     function () {
  //       overRenderer = false;
  //     },
  //     false
  //   );
  // }

  function init() {
    container.style.color = "#fff";
    container.style.font = "13px/20px Arial, sans-serif";

    var shader, uniforms, material;
    w = container.offsetWidth || window.innerWidth;
    h = container.offsetHeight || window.innerHeight;

    camera = new THREE.PerspectiveCamera(26, w / h, 1, 10000);
    camera.position.z = distance;

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(150, 40, 30);

    shader = Shaders["earth"];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms["texture"].value = THREE.ImageUtils.loadTexture(
      "assets/images/world.html"
    );
    uniforms["texture"].value.transparent = true;
    uniforms["texture"].value.opacity = 0.01; // Adjust opacity as needed

    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI;
    scene.add(mesh);

    shader = Shaders["atmosphere"];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.1, 1.1, 1.1);
    scene.add(mesh);

    geometry = new THREE.CubeGeometry(0.75, 0.75, 1);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

    point = new THREE.Mesh(geometry);

    // Initialize the renderer with alpha: true
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(2400, 1200);
    // renderer.setSize(w, h);

    // Set clear color to transparent
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.position = "absolute";

    container.appendChild(renderer.domElement);

    container.addEventListener("mousedown", onMouseDown, false);

    // container.addEventListener("mousewheel", onMouseWheel, false);

    document.addEventListener("keydown", onDocumentKeyDown, false);

    window.addEventListener("resize", onWindowResize, false);

    container.addEventListener(
      "mouseover",
      function () {
        overRenderer = true;
      },
      false
    );

    container.addEventListener(
      "mouseout",
      function () {
        overRenderer = false;
      },
      false
    );
  }

  addData = function (data, opts) {
    var lat, lng, size, color, i, step, colorFnWrapper;

    opts.animated = opts.animated || false;
    this.is_animated = opts.animated;
    opts.format = opts.format || "magnitude"; // other option is 'legend'
    //console.log(opts.format);
    if (opts.format === "magnitude") {
      step = 3;
      colorFnWrapper = function (data, i) {
        return colorFn(data[i + 2]);
      };
    } else if (opts.format === "legend") {
      step = 4;
      colorFnWrapper = function (data, i) {
        return colorFn(data[i + 3]);
      };
    } else {
      throw "error: format not supported: " + opts.format;
    }

    if (opts.animated) {
      if (this._baseGeometry === undefined) {
        this._baseGeometry = new THREE.Geometry();
        for (i = 0; i < data.length; i += step) {
          lat = data[i];
          lng = data[i + 1];
          //        size = data[i + 2];
          color = colorFnWrapper(data, i);
          size = 0;
          addPoint(lat, lng, size, color, this._baseGeometry);
        }
      }
      if (this._morphTargetId === undefined) {
        this._morphTargetId = 0;
      } else {
        this._morphTargetId += 1;
      }
      opts.name = opts.name || "morphTarget" + this._morphTargetId;
    }
    var subgeo = new THREE.Geometry();
    for (i = 0; i < data.length; i += step) {
      lat = data[i];
      lng = data[i + 1];
      color = colorFnWrapper(data, i);
      size = data[i + 2];
      size = size * 150;
      addPoint(lat, lng, size, color, subgeo);
    }
    if (opts.animated) {
      this._baseGeometry.morphTargets.push({
        name: opts.name,
        vertices: subgeo.vertices,
      });
    } else {
      this._baseGeometry = subgeo;
    }
  };

  function createPoints() {
    if (this._baseGeometry !== undefined) {
      if (this.is_animated === false) {
        this.points = new THREE.Mesh(
          this._baseGeometry,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            morphTargets: false,
          })
        );
      } else {
        if (this._baseGeometry.morphTargets.length < 8) {
          console.log("t l", this._baseGeometry.morphTargets.length);
          var padding = 8 - this._baseGeometry.morphTargets.length;
          console.log("padding", padding);
          for (var i = 0; i <= padding; i++) {
            console.log("padding", i);
            this._baseGeometry.morphTargets.push({
              name: "morphPadding" + i,
              vertices: this._baseGeometry.vertices,
            });
          }
        }
        this.points = new THREE.Mesh(
          this._baseGeometry,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            morphTargets: true,
          })
        );
      }
      scene.add(this.points);
    }
  }

  function addPoint(lat, lng, size, color, subgeo) {
    var phi = ((90 - lat) * Math.PI) / 180;
    var theta = ((180 - lng) * Math.PI) / 180;

    point.position.x = 150 * Math.sin(phi) * Math.cos(theta);
    point.position.y = 150 * Math.cos(phi);
    point.position.z = 150 * Math.sin(phi) * Math.sin(theta);

    point.lookAt(mesh.position);

    point.scale.z = Math.max(size, 0.1); // avoid non-invertible matrix
    point.updateMatrix();

    for (var i = 0; i < point.geometry.faces.length; i++) {
      point.geometry.faces[i].color = color;
    }

    THREE.GeometryUtils.merge(subgeo, point);
  }

  function onMouseDown(event) {
    event.preventDefault();

    k = 0;
    f = true;

    container.addEventListener("mousemove", onMouseMove, false);
    container.addEventListener("mouseup", onMouseUp, false);
    container.addEventListener("mouseout", onMouseOut, false);

    target.y = rotation.y;

    mouseOnDown.x = -event.clientX;
    mouseOnDown.y = event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;

    container.style.cursor = "move";
  }

  function onMouseMove(event) {
    mouse.x = -event.clientX;
    mouse.y = event.clientY;

    var zoomDamp = distance / 1000;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
  }

  function onMouseUp(event) {
    k = ROTATIONSPEED;
    f = false;

    container.removeEventListener("mousemove", onMouseMove, false);
    container.removeEventListener("mouseup", onMouseUp, false);
    container.removeEventListener("mouseout", onMouseOut, false);
    container.style.cursor = "auto";
  }

  function onMouseOut(event) {
    k = ROTATIONSPEED;
    f = false;

    container.removeEventListener("mousemove", onMouseMove, false);
    container.removeEventListener("mouseup", onMouseUp, false);
    container.removeEventListener("mouseout", onMouseOut, false);
  }

  function onMouseWheel(event) {
    event.preventDefault();
    if (overRenderer) {
      zoom(event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 38:
        zoom(100);
        event.preventDefault();
        break;
      case 40:
        zoom(-100);
        event.preventDefault();
        break;
    }
  }

  function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function zoom(delta) {
    distanceTarget -= delta;
    distanceTarget = distanceTarget > 1100 ? 1100 : distanceTarget;
    distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    zoom(curZoomSpeed);

    target.x -= k;

    rotation.x += (target.x - rotation.x) * 0.2;

    if (f == true) {
      rotation.y += (target.y - rotation.y) * 0.2;
    }
    if (f == false) {
      target.y = Math.PI / 5.0;
      rotation.y += (target.y - rotation.y) * 0.02;
    }

    distance += (distanceTarget - distance) * 0.3;

    camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
    camera.position.y = distance * Math.sin(rotation.y);
    camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

    camera.lookAt(mesh.position);

    renderer.render(scene, camera);
  }

  init();
  this.animate = animate;

  this.__defineGetter__("time", function () {
    return this._time || 0;
  });

  this.__defineSetter__("time", function (t) {
    var validMorphs = [];
    var morphDict = this.points.morphTargetDictionary;
    for (var k in morphDict) {
      if (k.indexOf("morphPadding") < 0) {
        validMorphs.push(morphDict[k]);
      }
    }
    validMorphs.sort();
    var l = validMorphs.length - 1;
    var scaledt = t * l + 1;
    var index = Math.floor(scaledt);
    for (i = 0; i < validMorphs.length; i++) {
      this.points.morphTargetInfluences[validMorphs[i]] = 0;
    }
    var lastIndex = index - 1;
    var leftover = scaledt - index;
    if (lastIndex >= 0) {
      this.points.morphTargetInfluences[lastIndex] = 1 - leftover;
    }
    this.points.morphTargetInfluences[index] = leftover;
    this._time = t;
  });

  this.addData = addData;
  this.createPoints = createPoints;
  this.renderer = renderer;
  this.scene = scene;
  renderer.setClearColor(0x000000, 0);

  return this;
};
