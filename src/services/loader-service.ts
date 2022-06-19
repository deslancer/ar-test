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
        let filename = searchParams.get('file');
        const defaultFile = `type_a`;

        BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/", `${filename ? filename : defaultFile}.glb`, scene).then((result) => {
            meshes = result.meshes[0];
            const buildingNode = scene.getNodeByName('Building')
            scene.activeCamera.setTarget(buildingNode.getAbsolutePosition())
            const buildingMaterial = scene.getMaterialByName('Building');
            const innerWallsMaterial = scene.getMaterialByName('Inner_Walls');
            const stairsMaterial = scene.getMaterialByName('Details');
            const detailsMaterial = scene.getMaterialByName('Tree');
            const windowGlass = scene.getMaterialByName('Window_Glass');

            buildingMaterial.unlit = true;
            innerWallsMaterial.unlit = true;
            stairsMaterial.unlit = true;
            detailsMaterial.unlit = true;
            windowGlass.metallic = 1.0;
            windowGlass.albedoColor = new BABYLON.Color3(0.58, 0.77 , 0.84);

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
