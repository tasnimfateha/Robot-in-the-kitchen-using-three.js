import * as THREE from 'three';

export function lighting(scene) {
    const light = new THREE.SpotLight(0xffffff, 50);
    light.position.set(0, 6, 2);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.bias = -0.001;

    scene.add(light);
    scene.add(light.target);

    const bulbGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffaa });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0, 6, 2);
    scene.add(bulb);

    const shadeGeometry = new THREE.CylinderGeometry(0.4, 0.8, 1, 16, 1, true);
    const shadeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
    shade.position.set(0, 6.3, 2);
    scene.add(shade);
    return {
        light,
        bulb,
        shade
    };
}