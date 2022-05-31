import * as BABYLON from 'babylonjs';
import {DeviceIdentifierHelper} from "./device-identifier-helper";

export class CameraService{
    private readonly canvas: any;
    private readonly scene: any;
    constructor(canvas, scene) {
        this.canvas = canvas;
        this.scene = scene;
    }

    createPerspectiveCam(){
        let isDeviceMobile = new DeviceIdentifierHelper().isMobile();
        const camera = new BABYLON.ArcRotateCamera(
            "Camera",
            3.556,
            1.4,
            isDeviceMobile ? 80 : 35,
            new BABYLON.Vector3(0, 0, 0),
            this.scene);

        camera.lowerRadiusLimit = 15;
        camera.upperRadiusLimit = isDeviceMobile ? 60 : 45;
        camera.upperBetaLimit = Math.PI / 2.1;
        camera.attachControl(this.canvas, true);

        return camera
    }
}
