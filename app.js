(function () {
    return {
        "Run": function () {
            let flnm = decodeURIComponent(ZellaSoft.View.Parameter('source')) || undefined;
            let ttle = decodeURIComponent(ZellaSoft.View.Parameter('title')) || undefined;
            let icon = decodeURIComponent(ZellaSoft.View.Parameter('tile')) || undefined;
            let dwnn = ZellaSoft.intern.Split(ZellaSoft.intern.Split(flnm, '?', 2)[0], '/', Number.MAX_VALUE).reverse()[0];


            let el = {};
            let peng = '';
            if (ttle !== "undefined") {
                el = document.getElementById('ProductDisplayName');
                el.innerText = ttle;
                peng += '&title=' + encodeURIComponent(ttle);
            }
            if (icon !== "undefined") {
                el = document.getElementById('ProductDisplayTile');
                el.setAttribute("src", icon);
                peng += '&logo=' + encodeURIComponent(icon);
            }

            if (flnm !== "undefined" && dwnn !== "undefined") {
                el = document.getElementById('W10MSideload');
                el.setAttribute("href", flnm);
                //el.setAttribute("download", dwnn);

                el = document.getElementById('raw-download-link');
                el.setAttribute("href", flnm);
                //el.setAttribute("download", dwnn);

                document.getElementById('ms-appinstaller').href += flnm;
                document.getElementById('zellasoft-store').href += flnm;
                document.getElementById('wut').href += flnm;
                document.getElementById('open-store').href += encodeURIComponent(flnm);
                document.getElementById('penguin-store').href += encodeURIComponent(flnm) + peng;
            }



            if (ZellaSoft.IsLedge()) {
                if (navigator.platform === "ARM") {
                    App.ShowLedgeOutDate();
                } else { /* x86 */ }
            }
        },
        "Unload": function () {

        },
        "ShowLedgeOutDate": function () {
            let r = /Edge\/([0-9]+)(\.)([0-9]+)\b/;
            if (r.test(navigator.userAgent)) {
                let ver = parseInt(navigator.userAgent.match(r)[3]);
                if (ver < 15063) {
                    ZellaSoft.View.ContentDialog("Update Windows 10 Mobile to version 10.0.15063.0 or later to use \"Microsoft App Installer\", other sideloaders may still work.");
                } else if (ver < 15254) {
                    ZellaSoft.View.ContentDialog("Optional update to Windows 10 Mobile 10.0.15254.603.");
                }
            }
        },
        "OnHref": function (url) {
            return ZellaSoft.View.Navigate(url.toString());
        },
        "ToggleRoutingSelector": function () {
            let el = document.getElementsByClassName("RoutingSelectorBackdrop")[0];
            el.classList.toggle("show");
            return false;
        },
        "ShowTroubleshooter": function () {
            let el = document.getElementById('troubleshooter');
            el.scrollIntoView({ behavior: "smooth" });
            return false;
        },
        "SideloaderClicked": function () {
            setTimeout(() => { App.ShowTroubleshooter(); }, 1000);
            App.ToggleRoutingSelector();
            return false;
        },
        "DownloadVCLib140": function () {
            if (navigator.platform === "ARM") {
                return ZellaSoft.Launchers.DownloadFromURI('Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx');
            } else {
                ZellaSoft.View.ContentDialog("We don't have the right architecture for your device.");
            }
        },
        "DownloadMAI": function () {
            if (navigator.platform === "ARM") {
                return ZellaSoft.Launchers.DownloadFromURI('Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx');
            } else {
                ZellaSoft.View.ContentDialog("We don't have the right architecture for your device.");
            }
        }
    };
})
