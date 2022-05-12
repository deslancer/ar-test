import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {preloading} from "./store";

export class LoaderService {
    loadModel(scene) {
        preloading.update(() => {
            return true;
        });
        let meshes;

        BABYLON.SceneLoader.ImportMeshAsync("", "/assets/models/", 'scene2.glb', scene).then((result) => {
            meshes = result.meshes[0];
            //scene.activeCamera.setTarget(meshes)

            const ghostObject = meshes.getChildren()[0].clone("ghost");
            ghostObject.setEnabled(false);

            const building = ghostObject.getChildren();

            building.forEach((child)=>{
                child.visibility = 0.35;
            })
            preloading.update(() => {
                return false;
            });
        });

    }
}
