import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

import { EngineService } from './services/engine-service';
import { CameraService } from './services/camera-service';
import { LightService } from './services/light-service';
import { LoaderService } from './services/loader-service';
import { GUIService } from "./services/gui-service";
import { global_scene } from './services/store';

export const createScene = async ( canvas ) => {
	const engine = new EngineService( canvas ).getEngine();
	const scene = new BABYLON.Scene( engine );
	scene.clearColor = new BABYLON.Color4( 0.37, 0.37, 0.37, 1.0 ).toLinearSpace();
	const camera = new CameraService( canvas, scene ).createPerspectiveCam();

	const lightService = new LightService( scene );
	const loaderService = new LoaderService();

	const guiService = new GUIService(scene);

	lightService.createHDRILight();
	loaderService.loadModel( scene );

	global_scene.update( () => {
		return scene;
	} );

	engine.runRenderLoop( () => {
		scene.render();
	} );
	const pipeline = new BABYLON.DefaultRenderingPipeline(
		"defaultPipeline", // The name of the pipeline
		true, // Do you want the pipeline to use HDR texture?
		scene, // The scene instance
		[camera] // The list of cameras to be attached to
	);
	pipeline.fxaaEnabled = true;
	pipeline.samples = 4;
	pipeline.imageProcessing.contrast = 1.5;
	/*guiService.addSlider("camera contrast", function(value) {
		pipeline.imageProcessing.contrast = value;
	}, pipeline.imageProcessing.contrast, 0, 4, null, null);
	guiService.addColorPicker("Background Color", function(value) {
		scene.clearColor = value;
	}, scene.clearColor, "0", null);*/
	/*await scene.debugLayer.show({
		embedMode: true
	});*/
	return scene;
}
