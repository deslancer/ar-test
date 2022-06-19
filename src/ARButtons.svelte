<script lang="ts">
    import {XRService} from "./services/XR-service";
    import {DeviceIdentifierHelper} from "./services/device-identifier-helper";

    const deviceIdentifier = new DeviceIdentifierHelper();
    const xrService = new XRService();
    let isDeviceIOS = deviceIdentifier.isIOS()
    let isDeviceMobile = deviceIdentifier.isMobile();
	let iosBtnDisplay = 'none';
    export let scene;
    let enterAR = () => {
        xrService.enterXRSession(scene);
    }
	if (isDeviceIOS) {
		iosBtnDisplay = 'block';
    }

    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let filename = searchParams.get('file');
    const defaultFile = `type_a`;
    let href = `./assets/models/${filename ? filename : defaultFile}.usdz`;
</script>

{#if (isDeviceMobile && !isDeviceIOS)}
    <div class="ar_buttons">
            <div on:click|preventDefault={enterAR} class="ar_btn">
                <img src="./assets/view.png" width="48px" alt="ar">
            </div>
    </div>
{/if}
<a rel="ar" class="ar_ios_btn" style="display: {iosBtnDisplay};" {href} >
    <img src="./assets/view.png" width="48px" alt="ar">
</a>

<style>
    .ar_ios_btn {
        position: absolute;
        top: 20px;
        right: 20px;
    }
</style>
