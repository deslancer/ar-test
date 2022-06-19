<script lang="ts">
    export let scene;

    function zoomOut() {
        scene.activeCamera.inertialRadiusOffset -= 0.2;
    }

    function zoomIn() {
        scene.activeCamera.inertialRadiusOffset += 0.2;
    }
</script>

<div class="zoom_btns right-bottom-nav">
    <div class="icons_container">
        <p class="zoomOn my-4"  on:click={zoomIn}><img class="img_icon" src="assets/icons/plus.png" alt="plus"></p>
        <p class="zoomOut" on:click={zoomOut}><img class="img_icon" src="assets/icons/minus.png" alt="minus"></p>
    </div>
</div>
