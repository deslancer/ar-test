import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {preloading} from "./store";

export class LoaderService {
    loadModel(scene) {
        preloading.update(() => {
            return true;
        });
        let meshes;
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        let filename = searchParams.get('building');

        BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/", `type_a.glb`, scene).then((result) => {
            meshes = result.meshes[0];
            const buildingNode = scene.getNodeByName('Building')
            scene.activeCamera.setTarget(buildingNode.getAbsolutePosition())
            const buildingMaterial = scene.getMaterialByName('Type_A_Building');
            const doorsMaterial = scene.getMaterialByName('Type_A_Doors');
            const stairsMaterial = scene.getMaterialByName('Type_A_Stairs');
            const detailsMaterial = scene.getMaterialByName('Type_A_Details');

            buildingMaterial.unlit = true;
            doorsMaterial.unlit = true;
            stairsMaterial.unlit = true;
            detailsMaterial.unlit = true;

            const ghostObject = meshes.clone("ghost");

            ghostObject.setEnabled(false);

            const building = ghostObject.getChildren('', false);

            building.forEach((child)=>{
                child.visibility = 0.35;
            })
            preloading.update(() => {
                return false;
            });
        });

    }
}
