const express = require("express");
const app = express();
app.use(express.json());

/** 
 * Data Orchestrator Mock Endpoints
 */
app.post("/crd-empty", (req, res) => {
    res.status(200).send({});
});

app.post("/crd-no-data", (req, res) => {
    res.status(200).send({
        "customResources": []
  });
});

app.get("/crd/kinds", (req, res) => {
    res.status(200).send({
    "kinds": [
        "Data",
        "Database",
        "KeycloakClient",
        "Slot",
        "Microservice",
        "Microfrontend",
        "Parameter",
        "Product",
        "Permission"
    ]
  });
});

app.post("/crd", (req, res) => {
  res.status(200).send({
    "customResources": [
        {
            "kind": "Data",
            "resourceVersion": "301195144",
            "version": "",
            "creationTimestamp": "2024-07-03T08:28:37Z",
            "lastModified": "2024-08-22T13:15:10Z",
            "name": "onecx-help-ui-onecx-help-ui-assignments",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        },
        {
            "kind": "Data",
            "resourceVersion": "301208770",
            "version": "",
            "creationTimestamp": "2024-07-03T09:11:06Z",
            "lastModified": "2025-10-14T09:27:41Z",
            "name": "onecx-help-ui-onecx-help-ui-tenant-mho",
            "message": "Missing configuration for key tenant1XXXXX1",
            "responseCode": -1,
            "status": "ERROR"
        },
        {
            "kind": "Data",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED",
            "resourceVersion": "750084059",
            "version": "",
            "creationTimestamp": "2024-07-03T09:22:51Z",
            "lastModified": "2025-05-03T23:59:37Z",
            "name": "onecx-help-ui-onecx-help-ui-theme-mho-th"
        },        
        {
            "kind": "Database",
            "resourceVersion": "339436232",
            "version": "0.1.0-rc.87",
            "creationTimestamp": "2024-05-27T06:39:50Z",
            "lastModified": "2025-04-22T09:15:51Z",
            "name": "onecx-parameter-svc-db",
            "message": "org.postgresql.util.PSQLException: ERROR: permission denied",
            "responseCode": null,
            "status": "ERROR"
        },
        {
            "kind": "Database",
            "resourceVersion": "331896060",
            "version": "1.7.0-rc.1",
            "creationTimestamp": "2024-03-26T09:24:39Z",
            "lastModified": "2025-04-11T13:05:38Z",
            "name": "onecx-permission-svc-db",
            "message": "org.postgresql.util.PSQLException: ERROR: permission denied",
            "responseCode": null,
            "status": "ERROR"
        },
        {
            "kind": "KeycloakClient",
            "resourceVersion": "335778528",
            "version": "1.6.0-rc.1",
            "creationTimestamp": "2024-06-20T10:26:16Z",
            "lastModified": "2025-04-17T05:47:48Z",
            "name": "onecx-announcement-bff",
            "message": null,
            "responseCode": null,
            "status": "UPDATED"
        },
        {
            "kind": "KeycloakClient",
            "resourceVersion": "335778576",
            "version": "1.6.0-rc.1",
            "creationTimestamp": "2024-06-20T18:32:24Z",
            "lastModified": "2025-04-17T05:47:51Z",
            "name": "onecx-announcement-svc",
            "message": null,
            "responseCode": null,
            "status": "UPDATED"
        },
        {
            "kind": "Microfrontend",
            "resourceVersion": "331326729",
            "version": "1.8.0",
            "creationTimestamp": "2024-05-02T10:02:01Z",
            "lastModified": "2025-04-10T16:50:53Z",
            "name": "onecx-product-store-ui-main",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        },
        {
            "kind": "Microfrontend",
            "resourceVersion": "331326728",
            "version": "1.8.0",
            "creationTimestamp": "2025-03-28T04:58:06Z",
            "lastModified": "2025-04-10T16:50:53Z",
            "name": "onecx-product-store-ui-product-infos",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        },
        {
            "kind": "Microservice",
            "resourceVersion": "331340798",
            "version": "1.7.0",
            "creationTimestamp": "2024-04-30T11:14:41Z",
            "lastModified": "2025-04-10T17:20:39Z",
            "name": "onecx-theme-bff",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        },
        {
            "kind": "Microservice",
            "resourceVersion": "331340818",
            "version": "1.8.0",
            "creationTimestamp": "2024-04-30T11:14:41Z",
            "lastModified": "2025-04-10T17:20:39Z",
            "name": "onecx-theme-svc",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        },
        {
            "kind": "Permission",
            "resourceVersion": "334640926",
            "version": "1.4.0",
            "creationTimestamp": "2024-10-22T10:49:26Z",
            "lastModified": "2025-04-15T15:26:50Z",
            "name": "onecx-iam-bff",
            "message": null,
            "responseCode": null,
            "status": "UPDATED"
        },
        {
            "kind": "Permission",
            "resourceVersion": "334640965",
            "version": "1.4.0",
            "creationTimestamp": "2024-10-22T10:49:26Z",
            "lastModified": "2025-04-15T15:26:52Z",
            "name": "onecx-iam-ui",
            "message": null,
            "responseCode": null,
            "status": "UPDATED"
        },
        {
            "kind": "Product",
            "resourceVersion": "327154882",
            "version": "1.11.0-rc.3",
            "creationTimestamp": "2024-03-26T09:24:37Z",
            "lastModified": "2025-04-04T11:05:43Z",
            "name": "onecx-workspace",
            "message": null,
            "responseCode": null,
            "status": "UPDATED"
        },
        {
            "kind": "Product",
            "resourceVersion": "303206829",
            "version": "0.0.0-rc.39",
            "creationTimestamp": "2024-05-03T11:25:54Z",
            "lastModified": "2025-02-28T04:52:52Z",
            "name": "process-log-mgmt",
            "message": null,
            "responseCode": null,
            "status": "UPDATED"
        },
        {
            "kind": "Slot",
            "resourceVersion": "319725996",
            "version": "1.4.0",
            "creationTimestamp": "2025-03-04T09:35:33Z",
            "lastModified": "2025-03-24T10:17:31Z",
            "name": "onecx-iam-ui-onecx-iam-user-permissions",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        },
        {
            "kind": "Slot",
            "resourceVersion": "340296947",
            "version": "0.0.0-rc.73",
            "creationTimestamp": "2025-03-28T19:34:11Z",
            "lastModified": "2025-04-23T14:03:52Z",
            "name": "onecx-parameter-ui-onecx-product-infos",
            "message": null,
            "responseCode": 200,
            "status": "UPDATED"
        }
    ]
  });
});

app.get(`/crd/Data/onecx-help-ui-onecx-help-ui-tenant-mho`, (req, res) => {
  res.send({
    "crd": {
        "apiVersion": "onecx.tkit.org/v1",
        "kind": "Data",
        "metadata": {
            "annotations": {
                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Data\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-help-ui-onecx-help-ui\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-help-ui-onecx-help-ui\",\"helm.sh/chart\":\"onecx-help-ui-0.0.1\",\"version\":null},\"name\":\"onecx-help-ui-onecx-help-ui-tenant-mho\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-help-ui\",\"data\":\"{\\n  \\\"id\\\": \\\"tenant-mho\\\",\\n  \\\"tenants\\\": {\\n    \\\"888\\\": {\\n      \\\"orgId\\\": \\\"mho\\\",\\n      \\\"description\\\": \\\"Tenant 888 for MHO\\\"\\n    }\\n  }\\n}\\n\",\"key\":\"tenant\",\"orgId\":\"dtag\",\"productName\":\"onecx-help\"}}\n"
            },
            "creationTimestamp": "2024-07-03T09:11:06Z",
            "generation": 3,
            "labels": {
                "app": "onecx-help-ui-onecx-help-ui",
                "app.kubernetes.io/managed-by": "Helm",
                "app.kubernetes.io/name": "onecx-help-ui-onecx-help-ui",
                "helm.sh/chart": "onecx-help-ui-0.0.1",
                "version": ""
            },
            "managedFields": [
                {
                    "apiVersion": "onecx.tkit.org/v1",
                    "fieldsType": "FieldsV1",
                    "fieldsV1": {
                        "f:metadata": {
                            "f:annotations": {
                                ".": {},
                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                            },
                            "f:labels": {
                                ".": {},
                                "f:app": {},
                                "f:app.kubernetes.io/managed-by": {},
                                "f:app.kubernetes.io/name": {},
                                "f:helm.sh/chart": {},
                                "f:version": {}
                            }
                        },
                        "f:spec": {
                            ".": {},
                            "f:appId": {},
                            "f:orgId": {},
                            "f:productName": {}
                        }
                    },
                    "manager": "kubectl-client-side-apply",
                    "operation": "Update",
                    "time": "2024-07-03T09:11:06Z"
                },
                {
                    "apiVersion": "onecx.tkit.org/v1",
                    "fieldsType": "FieldsV1",
                    "fieldsV1": {
                        "f:status": {
                            ".": {},
                            "f:message": {},
                            "f:responseCode": {},
                            "f:status": {}
                        }
                    },
                    "manager": "fabric8-kubernetes-client",
                    "operation": "Update",
                    "subresource": "status",
                    "time": "2024-10-14T09:27:41Z"
                },
                {
                    "apiVersion": "onecx.tkit.org/v1",
                    "fieldsType": "FieldsV1",
                    "fieldsV1": {
                        "f:spec": {
                            "f:data": {},
                            "f:key": {}
                        }
                    },
                    "manager": "node-fetch",
                    "operation": "Update",
                    "time": "2024-10-14T09:27:41Z"
                }
            ],
            "name": "onecx-help-ui-onecx-help-ui-tenant-mho",
            "namespace": "dev",
            "resourceVersion": "301208770",
            "uid": "b4d761b8-db97-4e6c-bd39-61d3ccdad543"
        },
        "spec": {
            "appId": "onecx-help-ui",
            "data": "{\n  \"id\": \"tenant-mho\",\n  \"tenants\": {\n    \"888\": {\n      \"orgId\": \"mho\",\n      \"description\": \"Tenant 888 for MHO X\"\n    }\n  }\n}\n",
            "key": "tenant1XXXXX1",
            "orgId": "dtag",
            "productName": "onecx-help"
        },
        "status": {
            "message": "Missing configuration for key tenant1XXXXX1",
            "responseCode": -1,
            "status": "ERROR"
        }
    }
});
});

app.get(`/crd/Data/onecx-help-ui-onecx-help-ui-theme-mho-th`, (req, res) => {
  res.send({
    "crd": {
        "apiVersion": "onecx.tkit.org/v1",
        "kind": "Data",
        "metadata": {
            "annotations": {
                "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Data\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-help-ui-onecx-help-ui\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-help-ui-onecx-help-ui\",\"helm.sh/chart\":\"onecx-help-ui-0.0.1\",\"version\":null},\"name\":\"onecx-help-ui-onecx-help-ui-theme-mho-th\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-help-ui\",\"data\":\"{\\n    \\\"id\\\": \\\"theme-local-request-id\\\",\\n    \\\"themes\\\": {\\n      \\\"mho\\\": {\\n        \\\"cssFile\\\": null,\\n        \\\"description\\\": \\\"MHO Theme\\\",\\n        \\\"assetsUrl\\\": null,\\n        \\\"logoUrl\\\": null,\\n        \\\"faviconUrl\\\": null,\\n        \\\"previewImageUrl\\\": null,\\n        \\\"assetsUpdateDate\\\": null,\\n        \\\"properties\\\": {\\n          \\\"font\\\": {\\n            \\\"font-family\\\": null,\\n            \\\"font-size\\\": null\\n          },\\n          \\\"topbar\\\": {\\n            \\\"topbar-bg-color\\\": \\\"#0D3650\\\",\\n            \\\"topbar-item-text-color\\\": \\\" #ffffff\\\",\\n            \\\"topbar-text-color\\\": \\\"#ffffff\\\",\\n            \\\"topbar-left-bg-color\\\": \\\"#0D3650\\\",\\n            \\\"topbar-item-text-hover-bg-color\\\": \\\"#262626\\\",\\n            \\\"topbar-menu-button-bg-color\\\": \\\" rgb(255 0 68)\\\",\\n            \\\"logo-color\\\": \\\" #ffffff\\\"\\n          },\\n          \\\"general\\\": {\\n            \\\"primary-color\\\": \\\"#274B5F\\\",\\n            \\\"secondary-color\\\": \\\"#1C4257\\\",\\n            \\\"text-color\\\": \\\" rgba(0, 0, 0, 0.87)\\\",\\n            \\\"text-secondary-color\\\": \\\"#262626\\\",\\n            \\\"body-bg-color\\\": \\\" #f7f7f7\\\",\\n            \\\"content-bg-color\\\": \\\" #ffffff\\\",\\n            \\\"content-alt-bg-color\\\": \\\" #ffffff\\\",\\n            \\\"overlay-content-bg-color\\\": \\\" #ffffff\\\",\\n            \\\"hover-bg-color\\\": \\\"#ad1457\\\",\\n            \\\"solid-surface-text-color\\\": \\\" #ffffff\\\",\\n            \\\"divider-color\\\": \\\" #e4e4e4\\\",\\n            \\\"button-hover-bg\\\": \\\"#ad1457\\\",\\n            \\\"button-active-bg\\\": null,\\n            \\\"danger-button-bg\\\": \\\"#D32F2F\\\",\\n            \\\"info-message-bg\\\": \\\"#b3e5fc\\\",\\n            \\\"success-message-bg\\\": \\\"#c8e6c9\\\",\\n            \\\"warning-message-bg\\\": \\\"#ffecb3\\\",\\n            \\\"error-message-bg\\\": \\\"#ffcdd2\\\"\\n          },\\n          \\\"sidebar\\\": {\\n            \\\"menu-text-color\\\": \\\"#274B5F\\\",\\n            \\\"menu-bg-color\\\": \\\" #fdfeff\\\",\\n            \\\"menu-item-text-color\\\": \\\" #515c66\\\",\\n            \\\"menu-item-hover-bg-color\\\": \\\" #e4e4e4\\\",\\n            \\\"menu-active-item-text-color\\\": \\\" #515c66\\\",\\n            \\\"menu-active-item-bg-color\\\": \\\" rgba(0, 0, 0, 0.04)\\\",\\n            \\\"inline-menu-border-color\\\": \\\" #e4e4e4\\\"\\n          }\\n        },\\n        \\\"images\\\" : {\\n          \\\"logo\\\": {\\n            \\\"imageData\\\": \\\"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\\\",\\n            \\\"mimeType\\\": \\\"image/*\\\"\\n          },\\n          \\\"favicon\\\": {\\n            \\\"imageData\\\": \\\"AAABAAMAMDAAAAEAIACoJQAANgAAACAgAAABACAAqBAAAN4lAAAQEAAAAQAgAGgEAACGNgAAKAAAADAAAABgAAAAAQAgAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAAdWLwBjVi8AhFYvAIJWLwCCVi8AglYvAIJXMACAWTEAJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQiMAA3BIAFuXZgCInGkAhptpAIabaQCGm2kAhptpAIibaQBhnGoABQAAAAAAAAAAAAAAAJVjAAKPXgBSjFwAhIhZAIKEVQCCgFIAgnxOAIJ4SwB/dUkAJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9YMQD6WTIATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZD0AOV87AOeEWAD/n2wA/55rAP+eawD/nmsA/55rAP+eawDunmsASAAAAAAAAAAAAAAAAJVjADiRYQDkjl0A/4paAP+GVwD/glMA/31QAP96TQC+dkkAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1cwAP9ZMQD6WjMATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvRAALakEAq2A7AP9fPQD/k2MA/59sAP+eawD/nmsA/55rAP+eawD/nmsAw55rABgAAAAAnGoAEJhmALSVYwD/kWAA/41dAP+JWQD/hFYA/4BSAOx9TwBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1cwAP9aMgD6WzMATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvRABbbkQA92lBAP9YNwD/b0kA/51qAP+eawD/nmsA/55rAP+eawD/nmsA/p5rAIKgbQABnmsAc5tpAPuYZgD/k2IA/49fAP+LWwD/hlcA/4NUAIh5TAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1gxAP9aMwD6XDQATQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG5EABxvRQDMcUYA/29FAP9mQAD/WDgA/4ZaAP+fbAD/nmsA/55rAP+eawD/nmsA/55rAOeeawBznmsA4J1rAP+aaAD/lmQA/5JhAP+NXQD/iVkAy4VXABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1kxAP9bMwD7XDQAUAAAAAAAAAAAAAAAAAAAAAAAAAAAaD0AAW5EAIJwRQD/ckcA/3NIAP9vRgD/YT0A/2NBAP+XZgD/n2sA/55rAP+eawD/nmsA/55rAP+eawD3nmsA/p5rAP+cagD/mGYA/5RiAP+PXwDzjFwAUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1kyAP9bNAD8XTUAUQAAAAAAAAAAAAAAAAAAAAAAAAAAbUMANm9EAOZxRgD/c0gA/3VKAP91SgD/bkYA/107AP93TwD/nmsA/55rAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+dawD/mmgA/5VkAP+RYACbjFwABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWLwAKVi8ABFYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1kyAP9cNAD8XTUAUQAAAAAAAAAAAAAAAAAAAABrQQAKbUMAqG9EAP9xRgD/dEgA/3ZKAP94TAD/dksA/2tEAP9ePQD/jF8A/59sAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+eawD/m2kA/5dlANiUYgAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAAlWLwCYVi8AZVYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1oyAP9cNAD8XjYAUQAAAAAAAAAAAAAAAAAAAABsQQBYbUMA9m9FAP9yRwD/dEkA/3dLAP95TQD/ek4A/3VLAP9lQQD/akYA/5poAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+eawD/nGoA+ZlnAGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFcwAAJWLwBSVi8AhVYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1oyAP9cNAD8XjYAUQAAAAAAAAAAAAAAAGpAABprQQDKbUMA/3BFAP9yRwD/dUkA/3dLAP95TQD/fE8A/3tPAP9ySgD/Xj0A/3xTAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+eawD/nWoArJtoAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgVoRBl01AGlZMQCdVi8AR1YvAA1WLwDCVi8A/1YvAP9WLwD/WDAA/1oyAP9cNQD8XjYAUQAAAAAAAAAAAAAAAGk/AH9rQQD+bUMA/3BFAP9yRwD/dUkA/3dLAP96TQD/fE8A/31QAP94TgD/ZUIA/1c6AP+SYwD/n2sA/55rAP+eawD/nmsA/55rAP+hbwX7sYYkVwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5MRIAeTDSATqyktIyaY5pmY+BPJYMQD/Vi8Ar1YvAA1WLwDCVi8A/1YvAP9WLwD/WDAA/1oyAP9cNAD8XjYAUQAAAAAAAAAAZz4ANGk/AORrQQD/bUMA/3BFAP9yRwD/dUkA/3dLAP96TQD/fE8A/3xQAP92TQD/YkAA/2JBAP+YZwD/nmsA/55rAP+eawD/nmsA/55rAP+kcwn/07Vdnv//1wgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlxEgt5sVImujHSq/jwkftrooq/2A4Af9ZMQD/Vi8AtVYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1oyAP9cNAD8XjYAUQAAAABkOwAJZj0ApWg/AP9rQQD/bUMA/3BFAP9yRwD/dEkA93dLAOB5TQD/e08A/3lOAP9tRgD/Xj4A/4pdAP+fbAD/nmsA/55rAP+eawD/nmsA/55rAP+fbAD/zatI9+valIvp2Zse6diWBenYlgjp2JYu6diYcunWj4fmx0++375E/7uWL/+PaBf/aUAE/101AP9ZMQD/Vi8AlFYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1oyAP9cNAD8XjUAUQAAAABkOwBVZjwA9Wg+AP9qQAD/bUMA/29FAP9yRwD/dEgAt3dLAJN5TAD/eE0A/3FJAP9fPQD/dk8A/55rAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+dagD/soUX/+PJafzp15Da6diXs+nYmLvp2Jfn6daP/ufNa//hwEf/nncc/21DAf9lOwD/YTgA/101AP9YMQD4Vi8AXVYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1kyAP9cNAD8XTUAUGI6ABRjOgDHZTwA/2g+AP9qQAD/bEIA/29EAP9xRgDvckcARHdLAH13SwD/c0kA/2RAAP9jQQD/lmYA/59rAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+eawD/nGkB/72TJP/jxVf/6M9w/+jQdv/nzm7/58lZ/+bFSf+2kSr/ckcC/2pAAP9mPAD/YTgA/1w0AP9YMQDVVi8AIFYvAA1WLwDCVi8A/1YvAP9WLwD/VzAA/1kxAP9bMwD7XDUAUWE4AHdiOgD+ZTwA/2c+AP9pQAD/bEIA/25EAP9wRQCXb0MAAXVJAH1zSAD/aUIA/1o6AP+FWgD/n2wA/55rAP+eawD/nmsA/55rAP+eawD/nmsA/55rAP+dagD/mWYA/5ZlAv+tghj/zqk0/9y5Qf/evEL/17Q9/7SOKP99Ugb/bkMA/2pAAP9lPAD/YDgA/1s0AP9YMQCBAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1gxAP9bMwD5XTUAgmA3AN5iOQD/ZDsA/2Y9AP9pPwD/a0EA/21DANxvRAAqAAAAAHFHAH1rRAD/WjkA/29JAP+dagD/nmsA/55rAP+eawD/nmsA/55rAP6eawDlnmsA+55rAP+baQD/l2UA/5JhAP+NXQD/jl8D/5NnC/+SZw3/h1sI/3hLAf9yRgD/bkMA/2k/AP9kOwD/XzcA/1szAM5YMQAfAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1gwAP9aMgD8XDQA5V82AP5hOAD/YzoA/2Y8AP9oPgD/akAA/GxCAHEAAAAAAAAAAGpCAH1fPAD/XDsA/5NjAP+fbAD/nmsA/55rAP+eawD/nmsA/55rANueawBDnmsAtJ1qAP+ZZwD/lWMA/5BgAP+MXAD/h1gA/4JTAP99TwD/eUwA/3VJAP9xRQD/bEEA/2c+AP9jOgD/XjYA6FszAEoAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1cwAP9ZMgD/XDQA/142AP9gOAD/YjoA/2U7AP9nPQD/aT8AwGtBABQAAAAAAAAAAGA7AH1VNgD/f1UA/59sAP+eawD/nmsA/55rAP+eawD/nmsA+p5rAGwAAAAAnWsAJJpoALuWZAD/kmEA/45eAP+KWgD/hVYA/4FTAP99TwD/eEsA/3RIAP9vRAD/akAA/2Y8AP9hOQDmXjYAWlMsAAEAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9YMQD/WzMA/101AP9fNwD/YTkA/2Q7AP9mPADyZz4ATQAAAAAAAAAAAAAAAFQ0AH5rRQD/m2kA/55rAP+eawD/nmsA/55rAP+eawD/nmsAs55rAA8AAAAAAAAAAJdlABqTYgCSj18A74tbAP+HWAD/g1QA/39RAP96TQD/dkoA/3JGAP9tQgD/aT8A/GU7AMNhOABCVzAAAQAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9XMAD/WjIA/1w0AP9eNgD/YDgA/2I6AP9kOwCdZz0ABgAAAAAAAAAAAAAAAGlDAH6QYQD/n2sA/55rAP+eawD/nmsA/55rAP+eawDnnmsAOgAAAAAAAAAAAAAAAAAAAACRYAAGjV0AQIlZAJyFVgDagFIA9HxPAPx4SwD+dEgA+XBEAOlsQQC9aD4AaGU7ABUAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9XMAD/WTEA/1szAP9dNQD/XzcA/2E4AOBjOgAuAAAAAAAAAAAAAAAAAAAAAHhMAH5/UQD/gFIA/4FTAP+CVAD/glQA/4NVAP+FVwClo28AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIVXAAOCVAAbf1EAPXtNAFR3SgBZc0cASm9EACtrQQALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/WDAA/1oyAP9cNAD/XjYA/WA3AHcAAAAAAAAAAAAAAAAAAAAAAAAAAGtBAH1sQgD/bkMA/29EAP9wRgD/ckcA/3NIAP9zSACbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/Vy8A/1gxAP9aMwD/XDQAxV42ABcAAAAAAAAAAAAAAAAAAAAAAAAAAGpAAH1rQQD/bEIA/25DAP9vRAD/cEUA/3FGAP9yRwCbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/Vi8A/1cwAP9ZMgD0WzMAUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGg+AH1pPwD/akAA/2xCAP9tQwD/bkMA/29EAP9wRQCbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/Vi8A/1YvAP9XMACjWjIACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGY9AH1nPQD/aD8A/2pAAP9rQQD/bEIA/21CAP9tQwCbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/Vi8A/1YvAONWLwAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ7AH1lPAD/Zj0A/2c+AP9pPwD/akAA/2pAAP9rQQCbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/Vi8A/lYvAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGI5AH1jOgD/ZDsA/2U8AP9mPQD/Zz4A/2g+AP9pPwCbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAA1WLwDCVi8A/1YvAP9WLwD/Vi8A/1YvAP9WLwD/Vi8AylYvABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGA3AH1hOAD/YjkA/2M6AP9kOwD/ZTwA/2Y8AP9mPQCbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAAZWLwBUVi8AcFYvAG5WLwBuVi8AblYvAG5WLwBvVi8AOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF82ADZgNwBvYTgAbmI5AG5jOgBuZDsAbmQ7AHBlOwBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AADA/+B/B/8AAID/wD4D/wAAgP+AHAf/AACA/4AMB/8AAID/AAgP/wAAgP4AAB//AACA/gAAH/8AAID8AAA//QAAgPwAAH/+AACA+AAAf/0AAID4AAD/8AAAgPAAAH+AAACA4AAAPgAAAIDgAAAAAQAAgMBgAAABAACAwGAAAAEAAIAA4AAAAwAAgAHgCAAHAACAAeAcAA8AAIAD4B4AHwAAgAPgP4B/AACAB+A///8AAIAP4D///wAAgA/gP///AACAH+A///8AAIAf4D///wAAgD/gP///AACAf+A///8AAIB/4D///wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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\\\",\\n            \\\"mimeType\\\": \\\"image/*\\\"\\n          }\\n        }\\n      }\\n    }\\n  }\\n\",\"key\":\"theme\",\"orgId\":\"dtag\",\"productName\":\"onecx-help\"}}\n"
            },
            "creationTimestamp": "2024-07-03T09:22:51Z",
            "generation": 1,
            "labels": {
                "app": "onecx-help-ui-onecx-help-ui",
                "app.kubernetes.io/managed-by": "Helm",
                "app.kubernetes.io/name": "onecx-help-ui-onecx-help-ui",
                "helm.sh/chart": "onecx-help-ui-0.0.1",
                "version": ""
            },
            "managedFields": [
                {
                    "apiVersion": "onecx.tkit.org/v1",
                    "fieldsType": "FieldsV1",
                    "fieldsV1": {
                        "f:status": {
                            "f:checksum": {},
                            "f:responseCode": {},
                            "f:status": {}
                        }
                    },
                    "manager": "data",
                    "operation": "Apply",
                    "subresource": "status",
                    "time": "2026-10-28T19:55:19Z"
                },
                {
                    "apiVersion": "onecx.tkit.org/v1",
                    "fieldsType": "FieldsV1",
                    "fieldsV1": {
                        "f:metadata": {
                            "f:annotations": {
                                ".": {},
                                "f:kubectl.kubernetes.io/last-applied-configuration": {}
                            },
                            "f:labels": {
                                ".": {},
                                "f:app": {},
                                "f:app.kubernetes.io/managed-by": {},
                                "f:app.kubernetes.io/name": {},
                                "f:helm.sh/chart": {},
                                "f:version": {}
                            }
                        },
                        "f:spec": {
                            ".": {},
                            "f:appId": {},
                            "f:data": {},
                            "f:key": {},
                            "f:orgId": {},
                            "f:productName": {}
                        }
                    },
                    "manager": "kubectl-client-side-apply",
                    "operation": "Update",
                    "time": "2024-07-03T09:22:51Z"
                },
                {
                    "apiVersion": "onecx.tkit.org/v1",
                    "fieldsType": "FieldsV1",
                    "fieldsV1": {
                        "f:status": {
                            ".": {},
                            "f:checksum": {},
                            "f:observedGeneration": {}
                        }
                    },
                    "manager": "fabric8-kubernetes-client",
                    "operation": "Update",
                    "subresource": "status",
                    "time": "2025-05-03T23:59:37Z"
                }
            ],
            "name": "onecx-help-ui-onecx-help-ui-theme-mho-th",
            "namespace": "dev",
            "resourceVersion": "750084059",
            "uid": "24b52220-6310-4ec2-939e-2d614c4348b9"
        },
        "spec": {
            "appId": "onecx-help-ui",
            "data": "{\n    \"id\": \"theme-local-request-id\",\n    \"themes\": {\n      \"mho\": {\n        \"cssFile\": null,\n        \"description\": \"MHO Theme\",\n        \"assetsUrl\": null,\n        \"logoUrl\": null,\n        \"faviconUrl\": null,\n        \"previewImageUrl\": null,\n        \"assetsUpdateDate\": null,\n        \"properties\": {\n          \"font\": {\n            \"font-family\": null,\n            \"font-size\": null\n          },\n          \"topbar\": {\n            \"topbar-bg-color\": \"#0D3650\",\n            \"topbar-item-text-color\": \" #ffffff\",\n            \"topbar-text-color\": \"#ffffff\",\n            \"topbar-left-bg-color\": \"#0D3650\",\n            \"topbar-item-text-hover-bg-color\": \"#262626\",\n            \"topbar-menu-button-bg-color\": \" rgb(255 0 68)\",\n            \"logo-color\": \" #ffffff\"\n          },\n          \"general\": {\n            \"primary-color\": \"#274B5F\",\n            \"secondary-color\": \"#1C4257\",\n            \"text-color\": \" rgba(0, 0, 0, 0.87)\",\n            \"text-secondary-color\": \"#262626\",\n            \"body-bg-color\": \" #f7f7f7\",\n            \"content-bg-color\": \" #ffffff\",\n            \"content-alt-bg-color\": \" #ffffff\",\n            \"overlay-content-bg-color\": \" #ffffff\",\n            \"hover-bg-color\": \"#ad1457\",\n            \"solid-surface-text-color\": \" #ffffff\",\n            \"divider-color\": \" #e4e4e4\",\n            \"button-hover-bg\": \"#ad1457\",\n            \"button-active-bg\": null,\n            \"danger-button-bg\": \"#D32F2F\",\n            \"info-message-bg\": \"#b3e5fc\",\n            \"success-message-bg\": \"#c8e6c9\",\n            \"warning-message-bg\": \"#ffecb3\",\n            \"error-message-bg\": \"#ffcdd2\"\n          },\n          \"sidebar\": {\n            \"menu-text-color\": \"#274B5F\",\n            \"menu-bg-color\": \" #fdfeff\",\n            \"menu-item-text-color\": \" #515c66\",\n            \"menu-item-hover-bg-color\": \" #e4e4e4\",\n            \"menu-active-item-text-color\": \" #515c66\",\n            \"menu-active-item-bg-color\": \" rgba(0, 0, 0, 0.04)\",\n            \"inline-menu-border-color\": \" #e4e4e4\"\n          }\n        },\n        \"images\" : {\n          \"logo\": {\n            \"imageData\": \"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\",\n            \"mimeType\": \"image/*\"\n          },\n          \"favicon\": {\n            \"imageData\": \"AAABAAMAMDAAAAEAIACoJQAANgAAACAgAAABACAAqBAAAN4lAAAQEAAAAQAgAGgEAACGNgAAKAAAADAAAABgAAAAAQAgAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AADA/+B/B/8AAID/wD4D/wAAgP+AHAf/AACA/4AMB/8AAID/AAgP/wAAgP4AAB//AACA/gAAH/8AAID8AAA//QAAgPwAAH/+AACA+AAAf/0AAID4AAD/8AAAgPAAAH+AAACA4AAAPgAAAIDgAAAAAQAAgMBgAAABAACAwGAAAAEAAIAA4AAAAwAAgAHgCAAHAACAAeAcAA8AAIAD4B4AHwAAgAPgP4B/AACAB+A///8AAIAP4D///wAAgA/gP///AACAH+A///8AAIAf4D///wAAgD/gP///AACAf+A///8AAIB/4D///wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvABtWLwBYVi8AXFYvAFxWLwBdWDEALwAAAAAAAAAAAAAAAAAAAAAAAAAATCwABX5TAEmcaQBgm2kAX5tpAF+baQBbnGkAGQAAAAAAAAAAkF8AE41cAFaHWABcgVMAXHtOAF53SgAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVi8AS1YvAPRWLwD/Vi8A/lcwAP9ZMQCCAAAAAAAAAAAAAAAAAAAAAAAAAABkPQBCZ0EA7ZJiAP+fawD/nmsA/55rAP+eawCQn2sABKhzAAKUYwCDkF8A/YpaAP6DVQD/fVAA5HhMADYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWLwBLVi8A9VYvAP9WLwD/WDEA/1ozAIIAAAAAAAAAAAAAAAAAAAAAcEUAD21DALZiPQD/cEoA/5xqAP+eawD/nmsA/55rAPCeawBKnWsAQZpnAOuUYwD/jl0A/4dYAP2CVAB5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAEtWLwD1Vi8A/1YvAP9ZMQD/WzMAgwAAAAAAAAAAAAAAAAAAAABvRABmcUYA+m5FAP9gPQD/hVkA/59sAP+eawD/nmsA/55rAM+eawDLnWoA/5hmAP+RYAD/i1sAv4VWABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVi8AS1YvAPVWLwD/Vy8A/1oyAP9cNACFAAAAAAAAAAAAAAAAbUMAI29EANVyRwD/dUkA/2xFAP9oRAD/lmUA/59rAP+eawD/nmsA/55rAP+eawD/mmgA/5RjAO2PXgBGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVi8ABlYvAAtWLwBLVi8A9VYvAP9XMAD/WjMA/101AIUAAAAAAAAAAGg+AANtQwCOcEUA/3NIAP93SwD/d0wA/2hDAP95UAD/nmsA/55rAP+eawD/nmsA/55rAP+caQD/l2UAjItbAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWLwAqVi8AelYvAEtWLwD1Vi8A/1cwAP9bMwD/XTUAhQAAAAAAAAAAa0EAQG1CAOtwRQD/dEkA/3hMAP97TgD/d0wA/2ZDAP+KXQD/n2wA/55rAP+eawD/nmsA/51qAM2aZwAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmncgCV01AVxXMABvVi8AS1YvAPVWLwD/VzAA/1szAP9dNQCFAAAAAGc+AA5qQACzbUIA/3FGAP90SQD/eEwA/3xPAP98UAD/aEMA/21JAP+dawD/nmsA/55rAP+fbAH/r4MflwAAAAAAAAAAAAAAAAAAAADhwEYB6MdKIPDPTknEojatZDwE91YvAMxWLwBLVi8A9VYvAP9XMAD/WzMA/101AIUAAAAAZz0AY2k/APltQgD/cEUA/3RIAPl4TADwe04A/3dNAP9lQgD/h1sA/59rAP+eawD/nmsA/55qAP++lzPl7NqRVerdqQ7p2pwU6dmcRujRdWvfvkTSvZkx9oljFf9dNQD/VzAAwlYvAEtWLwD1Vi8A/1cwAP9aMwD/XTUAg2Q7AB5lPADTaT8A/2xCAP9wRQD/c0gAtndLALR3TAD/aEMA/3ZOAP+dagD/nmsA/55rAP+eawD/nWoA/6l6D//cv17y6taIyunXjdDp1IL25cha/qeAIf9tQwL/YTgA/1s0AP9XMACJVi8AS1YvAPVWLwD/Vy8A/1oyAP9cNACHYjkAh2Q7AP9oPgD/a0EA/29EAOxxRgBCdUoAoW1FAP9mQgD/lGQA/59rAP+eawD/nmsA/55rAP+eawD/mmcA/6l7E//Oqj3/3L1N/9m4RP+zjSf/dUoE/2g+AP9iOQD/WzMA41cwADZWLwBLVi8A9VYvAP9WLwD/WTEA/1w0AMBgOADnYzoA/2c9AP9qQAD/bUMAkHpLAARsRACjXzwA/4JXAP+fbAD/nmsA/55rAP+eawDgnmsA2J1qAP+XZgD/kF8A/45fA/+RZQr/iV0J/3dLAv9uQwD/Zz0A/2A3AP1bMwB/TCcAAlYvAEtWLwD1Vi8A/1YvAP9YMQD/WzMA/F82AP9iOQD/ZTwA/2g/ANdrQQAlAAAAAFw5AKNtRwD/nGkA/55rAP+eawD/nmsA+Z5rAGWeawA5mmcA1ZRiAP+NXQD/h1cA/39RAP95TAD/c0cA/2xBAP9lPAD8YDcAnVszABAAAAAAVi8AS1YvAPVWLwD/Vi8A/1cwAP9aMgD/XTUA/2E4AP9kOwD7Zj0AagAAAAAAAAABZUEAo5FhAP+gbAD/n2wA/59rAP+eawCunmsADAAAAACVZAAukF8Ap4paAO+DVQD/fU8A/3ZKAP9wRQD9aj8A3GQ7AHZfNwAPAAAAAAAAAABWLwBLVi8A9VYvAP9WLwD/Vi8A/1gxAP9cNAD/XzcA/2I5ALplOwARAAAAAAAAAAF8UACjiFkA/4paAP+KWwD/jFwA8pJhAEEAAAAAAAAAAAAAAACLXAAIhlcAN4BSAG56TQCJdEgAg25DAFxpPwAhYTkAAQAAAAAAAAAAAAAAAFYvAEtWLwD1Vi8A/1YvAP9WLwD/VzAA/1oyAP9dNQDvXzcARwAAAAAAAAAAaj8AAWxBAKNtQwD/b0QA/3FGAP9zRwDqc0gAKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVi8AS1YvAPVWLwD/Vi8A/1YvAP9WLwD/WDEA/1szAJdgNwAFAAAAAAAAAABiOAABaT8Ao2pAAP9tQgD/bkQA/3BFAOpwRQArAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWLwBLVi8A9VYvAP9WLwD/Vi8A/1YvAP9WLwDbWDEAKQAAAAAAAAAAAAAAAF82AAFmPQCjZz4A/2lAAP9rQQD/bEIA6m1DACsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAExWLwD1Vi8A/1YvAP9WLwD/Vi8A/FYvAHEAAAAAAAAAAAAAAAAAAAAAXTQAAWM6AKNkOwD/Zj0A/2g+AP9pPwDqaT8AKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVi8AQFYvANBWLwDZVi8A2VYvANtWLwCtVi8AFAAAAAAAAAAAAAAAAAAAAABbMgABYDgAi2I5AN1jOgDZZTsA2mY8AMdmPQAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWLwAHVi8AF1YvABhWLwAYVi8AGVYvAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfNgAPYDcAGWE5ABhjOgAYZDsAFmQ7AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////+D8DB/g+Aw/4PgAP+DwAH/g4AB/4OAA/+DAAP4gwAD4IIAAACAEAABgBAAA4AwMAOAcDgPgHB/P4Dwf/+A8H//gfB//4Pwf/+D8H////////////////////////////8oAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVi8AJ1YvADtXMAAqWjMAAQAAAABeOgAGjF0AMp1rAD2cagAlAAAAAI1dACOEVgA8e04AKGo/AAEAAAAAAAAAAFYvAKVWLwD5WDEArlw0AAYAAAAAaEAATHZNAOmbaQD3nmsAyp5rAEGUYwDGiVkA8n9RAGEAAAAAAAAAAAAAAABWLwCsVi8A/1oyALhbNAAFbkMAFHFGAMBsRQD/h1oA/59sAPyeawDimmgA/5FgALKEVgAOAAAAAAAAAABWLwAJVi8ArFcwAP9bMwC4WzQABW1DAHJyRwD8d0sA/3RMAP+VZQD/n2sA/51qAeaXZAE4AAAAAAAAAACfgCgNXDUCVlYvAKxXMAD/WzMAtmY9ADFrQQDdckcA/XpNAPpxSQD/i14A/59rAP+pehHX48x6MPPkpCPfwFJeon0jtmI6BNdWLwCsVzAA/1ozAL1kOwCgakAA/3FGALpxSADRelAA/5xqAP+eawD/onII/sakQuPavV3jq4Yq+WxDA/9bMwCxVi8ArFYvAP9aMgDuYTgA9Wc+AOlqQQBHbEYAwpNjAP+fbAD1nmsAoZdlAOWQYQP/il4I/3NIAv9jOgDTWzQAN1YvAKxWLwD/WDEA/142AP9jOgCJXjoADoBUAMWSYQD/lWQAsaJuAA2RYABAhVYAnXhLALhtQgCQZDsALQAAAABWLwCsVi8A/1YvAP9aMgDTXzYAIG1CAAptQwDFcEUA/3NHAIkAAAAAAAAAAHlMAAJ0SAAGbEEAAQAAAAAAAAAAVi8ArVYvAP9WLwD5Vy8AZAAAAABjOgAMZTwAxWg/AP9qQACJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFYvAFJWLwB8Vi8AaFYvAA4AAAAAXzcABmE5AF5kOwB9ZjwAQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAP//AAAcTwAAGA8AABgfAAAQHAAAAAAAAAQBAAAEYwAADH8AABx/AAD//wAA//8AAP//AAA=\",\n            \"mimeType\": \"image/*\"\n          }\n        }\n      }\n    }\n  }\n",
            "key": "theme",
            "orgId": "dtag",
            "productName": "onecx-help"
        },
        "status": {
            "checksum": "E0021A19CD147A54D080E60DE7A68F6E",
            "observedGeneration": 1,
            "responseCode": 200,
            "status": "UPDATED"
        }
    }
  });
});

app.get(`/crd/Database/onecx-parameter-svc-db`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "Database",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Database\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-parameter-svc\",\"app.kubernetes.io/instance\":\"onecx-parameter-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-parameter-svc\",\"helm.sh/chart\":\"app-0.37.0\",\"version\":\"0.1.0-rc.87\"},\"name\":\"onecx-parameter-svc-db\",\"namespace\":\"dev\"},\"spec\":{\"host\":\"postgresql\",\"name\":\"onecx_parameter_svc\",\"password-key\":\"password\",\"password-secrets\":\"onecx-parameter-svc-db-config\",\"schema\":\"onecx_parameter_svc\",\"user\":\"onecx_parameter_svc\"}}\n"
                },
                "creationTimestamp": "2024-05-27T06:39:50Z",
                "generation": 1,
                "labels": {
                    "app": "onecx-parameter-svc",
                    "app.kubernetes.io/instance": "onecx-parameter-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-parameter-svc",
                    "helm.sh/chart": "app-0.37.0",
                    "version": "0.1.0-rc.87"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:message": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-03-25T23:21:10Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:host": {},
                                "f:name": {},
                                "f:password-key": {},
                                "f:password-secrets": {},
                                "f:schema": {},
                                "f:user": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-04-22T09:15:51Z"
                    }
                ],
                "name": "onecx-parameter-svc-db",
                "namespace": "dev",
                "resourceVersion": "339436232",
                "uid": "a5f4989c-43e1-48a5-818e-7aca6d5897f4"
            },
            "spec": {
                "host": "postgresql",
                "name": "onecx_parameter_svc",
                "password-key": "password",
                "password-secrets": "onecx-parameter-svc-db-config",
                "schema": "onecx_parameter_svc",
                "user": "onecx_parameter_svc"
            },
            "status": {
                "message": "org.postgresql.util.PSQLException: ERROR: permission denied",
                "status": "ERROR"
            }
        }
      });
});

app.get(`/crd/KeycloakClient/onecx-announcement-svc`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "KeycloakClient",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"KeycloakClient\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-announcement-svc\",\"app.kubernetes.io/instance\":\"onecx-announcement-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-announcement-svc\",\"helm.sh/chart\":\"app-0.37.0\",\"version\":\"1.6.0-rc.1\"},\"name\":\"onecx-announcement-svc\",\"namespace\":\"dev\"},\"spec\":{\"kcConfig\":{\"attributes\":null,\"bearerOnly\":null,\"clientAuthenticatorType\":null,\"clientId\":\"onecx-announcement-svc\",\"defaultClientScopes\":[\"ocx-tn:read\"],\"description\":null,\"directAccessGrantsEnabled\":null,\"enabled\":null,\"implicitFlowEnabled\":null,\"optionalClientScopes\":null,\"protocol\":null,\"publicClient\":null,\"redirectUris\":null,\"serviceAccountsEnabled\":null,\"standardFlowEnabled\":null,\"webOrigins\":null},\"passwordKey\":\"secret\",\"passwordSecrets\":\"onecx-announcement-svc-kc-client-config\",\"realm\":null,\"type\":\"machine\"}}\n"
                },
                "creationTimestamp": "2024-06-20T18:32:24Z",
                "finalizers": [
                    "keycloakclients.onecx.tkit.org/finalizer"
                ],
                "generation": 2,
                "labels": {
                    "app": "onecx-announcement-svc",
                    "app.kubernetes.io/instance": "onecx-announcement-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-announcement-svc",
                    "helm.sh/chart": "app-0.37.0",
                    "version": "1.6.0-rc.1"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:finalizers": {
                                    ".": {},
                                    "v:\"keycloakclients.onecx.tkit.org/finalizer\"": {}
                                }
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "time": "2024-06-20T18:32:24Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:kcConfig": {
                                    ".": {},
                                    "f:clientId": {},
                                    "f:defaultClientScopes": {}
                                },
                                "f:passwordKey": {},
                                "f:passwordSecrets": {},
                                "f:type": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-04-07T08:02:37Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:clientId": {},
                                "f:observedGeneration": {},
                                "f:response-code": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-04-17T05:47:51Z"
                    }
                ],
                "name": "onecx-announcement-svc",
                "namespace": "dev",
                "resourceVersion": "335778576",
                "uid": "ac072be4-c5b6-42ba-8d49-5af8270244af"
            },
            "spec": {
                "kcConfig": {
                    "clientId": "onecx-announcement-svc",
                    "defaultClientScopes": [
                        "ocx-tn:read"
                    ]
                },
                "passwordKey": "secret",
                "passwordSecrets": "onecx-announcement-svc-kc-client-config",
                "type": "machine"
            },
            "status": {
                "clientId": "onecx-announcement-svc",
                "observedGeneration": 2,
                "response-code": 200,
                "status": "UPDATED"
            }
        }
    })
});
  
app.get(`/crd/Microfrontend/onecx-product-store-ui-main`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "Microfrontend",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Microfrontend\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-product-store-ui\",\"app.kubernetes.io/instance\":\"onecx-product-store-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-product-store-ui\",\"helm.sh/chart\":\"app-0.20.0\",\"version\":\"1.8.0\"},\"name\":\"onecx-product-store-ui-main\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-product-store-ui\",\"appName\":\"onecx-product-store-ui\",\"appVersion\":\"1.8.0\",\"classifications\":[],\"contact\":\"onecx@1000kit.org\",\"deprecated\":true,\"description\":\"OneCX Product Store UI\",\"endpoints\":[{\"name\":\"product-detail\",\"path\":\"/{product-name}\"},{\"name\":\"apps\",\"path\":\"/apps\"},{\"name\":\"endpoints\",\"path\":\"/endpoints\"},{\"name\":\"slots\",\"path\":\"/slots\"}],\"exposedModule\":\"./OneCXProductStoreModule\",\"iconName\":null,\"note\":\"OneCX Product Store UI module auto import via MF operator\",\"productName\":\"onecx-product-store\",\"remoteBaseUrl\":\"/mfe/product-store/\",\"remoteEntry\":\"/mfe/product-store/remoteEntry.js\",\"remoteName\":\"onecx-product-store\",\"tagName\":\"ocx-product-store-component\",\"technology\":\"WEBCOMPONENTMODULE\",\"type\":\"MODULE\"}}\n"
                },
                "creationTimestamp": "2024-05-02T10:02:01Z",
                "generation": 96,
                "labels": {
                    "app": "onecx-product-store-ui",
                    "app.kubernetes.io/instance": "onecx-product-store-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-product-store-ui",
                    "helm.sh/chart": "app-0.20.0",
                    "version": "1.8.0"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:appId": {},
                                "f:appName": {},
                                "f:appVersion": {},
                                "f:classifications": {},
                                "f:contact": {},
                                "f:deprecated": {},
                                "f:description": {},
                                "f:endpoints": {},
                                "f:exposedModule": {},
                                "f:note": {},
                                "f:productName": {},
                                "f:remoteBaseUrl": {},
                                "f:remoteEntry": {},
                                "f:remoteName": {},
                                "f:tagName": {},
                                "f:technology": {},
                                "f:type": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-04-10T16:50:53Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:appId": {},
                                "f:appName": {},
                                "f:appVersion": {},
                                "f:observedGeneration": {},
                                "f:productName": {},
                                "f:responseCode": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-04-10T16:50:53Z"
                    }
                ],
                "name": "onecx-product-store-ui-main",
                "namespace": "dev",
                "resourceVersion": "331326729",
                "uid": "d630afd0-466e-432b-9fdc-2752b68039c3"
            },
            "spec": {
                "appId": "onecx-product-store-ui",
                "appName": "onecx-product-store-ui",
                "appVersion": "1.8.0",
                "classifications": ['UI'],
                "contact": "onecx@1000kit.org",
                "deprecated": true,
                "description": "OneCX Product Store UI",
                "endpoints": [
                    {
                        "name": "product-detail",
                        "path": "/{product-name}"
                    },
                    {
                        "name": "apps",
                        "path": "/apps"
                    },
                    {
                        "name": "endpoints",
                        "path": "/endpoints"
                    },
                    {
                        "name": "slots",
                        "path": "/slots"
                    }
                ],
                "exposedModule": "./OneCXProductStoreModule",
                "note": "OneCX Product Store UI module auto import via MF operator",
                "productName": "onecx-product-store",
                "remoteBaseUrl": "/mfe/product-store/",
                "remoteEntry": "/mfe/product-store/remoteEntry.js",
                "remoteName": "onecx-product-store",
                "tagName": "ocx-product-store-component",
                "technology": "WEBCOMPONENTMODULE",
                "type": "MODULE"
            },
            "status": {
                "appId": "onecx-product-store-ui",
                "appName": "onecx-product-store-ui",
                "appVersion": "1.8.0",
                "observedGeneration": 96,
                "productName": "onecx-product-store",
                "responseCode": 200,
                "status": "UPDATED"
            }
        }
    });
});

app.get(`/crd/Microfrontend/onecx-product-store-ui-product-infos`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "Microfrontend",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Microfrontend\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-product-store-ui\",\"app.kubernetes.io/instance\":\"onecx-product-store-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-product-store-ui\",\"helm.sh/chart\":\"app-0.20.0\",\"version\":\"1.8.0\"},\"name\":\"onecx-product-store-ui-product-infos\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-product-store-ui\",\"appName\":\"onecx-product-store-ui\",\"appVersion\":\"1.8.0\",\"classifications\":[],\"contact\":\"onecx@1000kit.org\",\"deprecated\":true,\"description\":\"Provide Product informations\",\"exposedModule\":\"./OneCXProductInfosComponent\",\"iconName\":null,\"note\":null,\"productName\":\"onecx-product-store\",\"remoteBaseUrl\":\"/mfe/product-store/\",\"remoteEntry\":\"/mfe/product-store/remoteEntry.js\",\"remoteName\":\"onecx-product-store\",\"tagName\":\"ocx-product-infos-component\",\"technology\":\"WEBCOMPONENTMODULE\",\"type\":\"COMPONENT\"}}\n"
                },
                "creationTimestamp": "2025-03-28T04:58:06Z",
                "generation": 10,
                "labels": {
                    "app": "onecx-product-store-ui",
                    "app.kubernetes.io/instance": "onecx-product-store-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-product-store-ui",
                    "helm.sh/chart": "app-0.20.0",
                    "version": "1.8.0"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:appId": {},
                                "f:appName": {},
                                "f:appVersion": {},
                                "f:classifications": {},
                                "f:contact": {},
                                "f:deprecated": {},
                                "f:description": {},
                                "f:exposedModule": {},
                                "f:productName": {},
                                "f:remoteBaseUrl": {},
                                "f:remoteEntry": {},
                                "f:remoteName": {},
                                "f:tagName": {},
                                "f:technology": {},
                                "f:type": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-04-10T16:50:53Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:appId": {},
                                "f:appName": {},
                                "f:appVersion": {},
                                "f:observedGeneration": {},
                                "f:productName": {},
                                "f:responseCode": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-04-10T16:50:53Z"
                    }
                ],
                "name": "onecx-product-store-ui-product-infos",
                "namespace": "dev",
                "resourceVersion": "331326728",
                "uid": "61108fea-807a-4d17-bb17-e13947435aa0"
            },
            "spec": {
                "appId": "onecx-product-store-ui",
                "appName": "onecx-product-store-ui",
                "appVersion": "1.8.0",
                "classifications": [],
                "contact": "onecx@1000kit.org",
                "deprecated": true,
                "description": "Provide Product informations",
                "exposedModule": "./OneCXProductInfosComponent",
                "productName": "onecx-product-store",
                "remoteBaseUrl": "/mfe/product-store/",
                "remoteEntry": "/mfe/product-store/remoteEntry.js",
                "remoteName": "onecx-product-store",
                "tagName": "ocx-product-infos-component",
                "technology": "WEBCOMPONENTMODULE",
                "type": "COMPONENT"
            },
            "status": {
                "appId": "onecx-product-store-ui",
                "appName": "onecx-product-store-ui",
                "appVersion": "1.8.0",
                "observedGeneration": 10,
                "productName": "onecx-product-store",
                "responseCode": 200,
                "status": "UPDATED"
            }
        }
    });
});

app.get(`/crd/Microservice/onecx-theme-bff`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "Microservice",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Microservice\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-theme-bff\",\"app.kubernetes.io/instance\":\"onecx-theme-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-theme-bff\",\"helm.sh/chart\":\"app-0.37.0\",\"version\":\"1.7.0\"},\"name\":\"onecx-theme-bff\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-theme-bff\",\"description\":\"OneCX Theme Backend For Frontend\",\"name\":\"OneCX Theme BFF\",\"productName\":\"onecx-theme\",\"type\":\"bff\",\"version\":\"1.7.0\"}}\n"
                },
                "creationTimestamp": "2024-04-30T11:14:41Z",
                "generation": 79,
                "labels": {
                    "app": "onecx-theme-bff",
                    "app.kubernetes.io/instance": "onecx-theme-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-theme-bff",
                    "helm.sh/chart": "app-0.37.0",
                    "version": "1.7.0"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:appId": {},
                                "f:description": {},
                                "f:name": {},
                                "f:productName": {},
                                "f:type": {},
                                "f:version": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-04-10T17:20:39Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:appId": {},
                                "f:appName": {},
                                "f:appVersion": {},
                                "f:observedGeneration": {},
                                "f:productName": {},
                                "f:responseCode": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-04-10T17:20:39Z"
                    }
                ],
                "name": "onecx-theme-bff",
                "namespace": "dev",
                "resourceVersion": "331340798",
                "uid": "53c77124-ee8f-458e-9902-a6bbeb9cb485"
            },
            "spec": {
                "appId": "onecx-theme-bff",
                "description": "OneCX Theme Backend For Frontend",
                "name": "OneCX Theme BFF",
                "productName": "onecx-theme",
                "type": "bff",
                "version": "1.7.0"
            },
            "status": {
                "appId": "onecx-theme-bff",
                "appName": "OneCX Theme BFF",
                "appVersion": "1.7.0",
                "observedGeneration": 79,
                "productName": "onecx-theme",
                "responseCode": 200,
                "status": "UPDATED"
            }
        }
    });
});

app.get(`/crd/Permission/onecx-iam-ui`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "Permission",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Permission\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-iam-ui\",\"app.kubernetes.io/instance\":\"onecx-iam-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-iam-ui\",\"helm.sh/chart\":\"app-0.20.0\",\"version\":\"1.4.0\"},\"name\":\"onecx-iam-ui\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-iam-ui\",\"description\":\"onecx-iam-ui\",\"name\":\"onecx-iam-ui\",\"permissions\":{\"PERMISSION\":{\"VIEW\":\"View user permissions\"},\"REALM\":{\"SEARCH\":\"Search realms\"},\"ROLE\":{\"SEARCH\":\"Search roles\"},\"USER\":{\"SEARCH\":\"Search users\",\"VIEW\":\"View user details\"}},\"productName\":\"onecx-iam\"}}\n"
                },
                "creationTimestamp": "2024-10-22T10:49:26Z",
                "generation": 4,
                "labels": {
                    "app": "onecx-iam-ui",
                    "app.kubernetes.io/instance": "onecx-iam-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-iam-ui",
                    "helm.sh/chart": "app-0.20.0",
                    "version": "1.4.0"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:appId": {},
                                "f:description": {},
                                "f:name": {},
                                "f:permissions": {
                                    ".": {},
                                    "f:PERMISSION": {
                                        ".": {},
                                        "f:VIEW": {}
                                    },
                                    "f:REALM": {
                                        ".": {},
                                        "f:SEARCH": {}
                                    },
                                    "f:ROLE": {
                                        ".": {},
                                        "f:SEARCH": {}
                                    },
                                    "f:USER": {
                                        ".": {},
                                        "f:SEARCH": {},
                                        "f:VIEW": {}
                                    }
                                },
                                "f:productName": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-03-24T10:17:31Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:appId": {},
                                "f:observedGeneration": {},
                                "f:response-code": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-04-15T15:26:52Z"
                    }
                ],
                "name": "onecx-iam-ui",
                "namespace": "dev",
                "resourceVersion": "334640965",
                "uid": "2992ea78-07a7-4a16-b5ee-4a0ed01c305c"
            },
            "spec": {
                "appId": "onecx-iam-ui",
                "description": "onecx-iam-ui",
                "name": "onecx-iam-ui",
                "permissions": {
                    "PERMISSION": {
                        "VIEW": "View user permissions"
                    },
                    "REALM": {
                        "SEARCH": "Search realms"
                    },
                    "ROLE": {
                        "SEARCH": "Search roles"
                    },
                    "USER": {
                        "SEARCH": "Search users",
                        "VIEW": "View user details"
                    }
                },
                "productName": "onecx-iam"
            },
            "status": {
                "appId": "onecx-iam-ui",
                "observedGeneration": 4,
                "response-code": 200,
                "status": "UPDATED"
            }
        }
    });
});

app.get(`/crd/Product/onecx-workspace`, (req, res) => {
    res.send({
      "crd": {
          "apiVersion": "onecx.tkit.org/v1",
          "kind": "Product",
          "metadata": {
              "annotations": {
                  "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Product\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-workspace\",\"app.kubernetes.io/instance\":\"onecx-workspace-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-workspace\",\"helm.sh/chart\":\"product-0.3.0\",\"version\":\"1.11.0-rc.3\"},\"name\":\"onecx-workspace\",\"namespace\":\"dev\"},\"spec\":{\"basePath\":\"/workspace\",\"description\":\"OneCX Workspace\",\"displayName\":\"OneCX Workspace\",\"iconName\":\"pi-ellipsis-h\",\"name\":\"onecx-workspace\",\"version\":\"1.11.0-rc.3\"}}\n"
              },
              "creationTimestamp": "2024-03-26T09:24:37Z",
              "generation": 439,
              "labels": {
                  "app": "onecx-workspace",
                  "app.kubernetes.io/instance": "onecx-workspace-dev",
                  "app.kubernetes.io/managed-by": "Helm",
                  "app.kubernetes.io/name": "onecx-workspace",
                  "helm.sh/chart": "product-0.3.0",
                  "version": "1.11.0-rc.3"
              },
              "managedFields": [
                  {
                      "apiVersion": "onecx.tkit.org/v1",
                      "fieldsType": "FieldsV1",
                      "fieldsV1": {
                          "f:metadata": {
                              "f:annotations": {
                                  ".": {},
                                  "f:kubectl.kubernetes.io/last-applied-configuration": {}
                              },
                              "f:labels": {
                                  ".": {},
                                  "f:app": {},
                                  "f:app.kubernetes.io/instance": {},
                                  "f:app.kubernetes.io/managed-by": {},
                                  "f:app.kubernetes.io/name": {},
                                  "f:helm.sh/chart": {},
                                  "f:version": {}
                              }
                          },
                          "f:spec": {
                              ".": {},
                              "f:basePath": {},
                              "f:description": {},
                              "f:displayName": {},
                              "f:iconName": {},
                              "f:name": {},
                              "f:version": {}
                          }
                      },
                      "manager": "argocd-controller",
                      "operation": "Update",
                      "time": "2025-04-04T11:05:43Z"
                  },
                  {
                      "apiVersion": "onecx.tkit.org/v1",
                      "fieldsType": "FieldsV1",
                      "fieldsV1": {
                          "f:status": {
                              ".": {},
                              "f:observedGeneration": {},
                              "f:product-name": {},
                              "f:status": {}
                          }
                      },
                      "manager": "fabric8-kubernetes-client",
                      "operation": "Update",
                      "subresource": "status",
                      "time": "2025-04-04T11:05:43Z"
                  }
              ],
              "name": "onecx-workspace",
              "namespace": "dev",
              "resourceVersion": "327154882",
              "uid": "ea3f17f3-f965-49bd-9687-4badbd0587b3"
          },
          "spec": {
              "basePath": "/workspace",
              "description": "OneCX Workspace",
              "displayName": "OneCX Workspace",
              "iconName": "pi-ellipsis-h",
              "name": "onecx-workspace",
              "version": "1.11.0-rc.3"
          },
          "status": {
              "observedGeneration": 439,
              "product-name": "onecx-workspace",
              "status": "UPDATED"
          }
      }
  });
  });
  
  app.get(`/crd/Slot/onecx-parameter-ui-onecx-product-infos`, (req, res) => {
    res.send({
        "crd": {
            "apiVersion": "onecx.tkit.org/v1",
            "kind": "Slot",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Slot\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-parameter-ui\",\"app.kubernetes.io/instance\":\"onecx-parameter-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-parameter-ui\",\"helm.sh/chart\":\"app-0.20.0\",\"version\":\"0.0.0-rc.73\"},\"name\":\"onecx-parameter-ui-onecx-product-infos\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-parameter-ui\",\"deprecated\":false,\"description\":\"Product details received from product store\",\"name\":\"onecx-product-infos\",\"productName\":\"onecx-parameter\"}}\n"
                },
                "creationTimestamp": "2025-03-28T19:34:11Z",
                "generation": 1,
                "labels": {
                    "app": "onecx-parameter-ui",
                    "app.kubernetes.io/instance": "onecx-parameter-dev",
                    "app.kubernetes.io/managed-by": "Helm",
                    "app.kubernetes.io/name": "onecx-parameter-ui",
                    "helm.sh/chart": "app-0.20.0",
                    "version": "0.0.0-rc.73"
                },
                "managedFields": [
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:status": {
                                ".": {},
                                "f:appId": {},
                                "f:name": {},
                                "f:observedGeneration": {},
                                "f:productName": {},
                                "f:responseCode": {},
                                "f:status": {}
                            }
                        },
                        "manager": "fabric8-kubernetes-client",
                        "operation": "Update",
                        "subresource": "status",
                        "time": "2025-03-29T05:34:11Z"
                    },
                    {
                        "apiVersion": "onecx.tkit.org/v1",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                            "f:metadata": {
                                "f:annotations": {
                                    ".": {},
                                    "f:kubectl.kubernetes.io/last-applied-configuration": {}
                                },
                                "f:labels": {
                                    ".": {},
                                    "f:app": {},
                                    "f:app.kubernetes.io/instance": {},
                                    "f:app.kubernetes.io/managed-by": {},
                                    "f:app.kubernetes.io/name": {},
                                    "f:helm.sh/chart": {},
                                    "f:version": {}
                                }
                            },
                            "f:spec": {
                                ".": {},
                                "f:appId": {},
                                "f:deprecated": {},
                                "f:description": {},
                                "f:name": {},
                                "f:productName": {}
                            }
                        },
                        "manager": "argocd-controller",
                        "operation": "Update",
                        "time": "2025-04-23T14:03:52Z"
                    }
                ],
                "name": "onecx-parameter-ui-onecx-product-infos",
                "namespace": "dev",
                "resourceVersion": "340296947",
                "uid": "71adb4ef-994a-4692-bc06-6ac233382a51"
            },
            "spec": {
                "appId": "onecx-parameter-ui",
                "deprecated": false,
                "description": "Product details received from product store",
                "name": "onecx-product-infos",
                "productName": "onecx-parameter"
            },
            "status": {
                "appId": "onecx-parameter-ui",
                "name": "onecx-product-infos",
                "observedGeneration": 1,
                "productName": "onecx-parameter",
                "responseCode": 200,
                "status": "UPDATED"
            }
        }
    });
});

// end new
app.listen(3000, () => console.log("Data Orchestrator mock server is listening on port 3000."));
