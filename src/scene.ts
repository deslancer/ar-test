import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

import { EngineService } from './services/engine-service';
import { CameraService } from './services/camera-service';
import { LightService } from './services/light-service';
import { LoaderService } from './services/loader-service';
import { global_scene } from './services/store';

export const createScene = async ( canvas ) => {
	const engine = new EngineService( canvas ).getEngine();
	const scene = new BABYLON.Scene( engine );
	scene.clearColor = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 ).toLinearSpace();
	const camera = new CameraService( canvas, scene ).createPerspectiveCam();

	const lightService = new LightService( scene );
	const loaderService = new LoaderService();

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
	/*await scene.debugLayer.show({
		embedMode: true
	});*/
	return scene;
}
