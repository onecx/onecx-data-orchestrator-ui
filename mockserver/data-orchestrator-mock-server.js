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
            "lastModified": "2024-10-14T09:27:41Z",
            "name": "onecx-help-ui-onecx-help-ui-tenant-mho",
            "message": "Missing configuration for key tenant1XXXXX1",
            "responseCode": -1,
            "status": "ERROR"
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
            "message": "Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1, Missing configuration for key tenant1XXXXX1",
            "responseCode": -1,
            "status": "ERROR"
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
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Microfrontend\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-product-store-ui\",\"app.kubernetes.io/instance\":\"onecx-product-store-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-product-store-ui\",\"helm.sh/chart\":\"app-0.20.0\",\"version\":\"1.8.0\"},\"name\":\"onecx-product-store-ui-main\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-product-store-ui\",\"appName\":\"onecx-product-store-ui\",\"appVersion\":\"1.8.0\",\"classifications\":[],\"contact\":\"onecx@1000kit.org\",\"deprecated\":false,\"description\":\"OneCX Product Store UI\",\"endpoints\":[{\"name\":\"product-detail\",\"path\":\"/{product-name}\"},{\"name\":\"apps\",\"path\":\"/apps\"},{\"name\":\"endpoints\",\"path\":\"/endpoints\"},{\"name\":\"slots\",\"path\":\"/slots\"}],\"exposedModule\":\"./OneCXProductStoreModule\",\"iconName\":null,\"note\":\"OneCX Product Store UI module auto import via MF operator\",\"productName\":\"onecx-product-store\",\"remoteBaseUrl\":\"/mfe/product-store/\",\"remoteEntry\":\"/mfe/product-store/remoteEntry.js\",\"remoteName\":\"onecx-product-store\",\"tagName\":\"ocx-product-store-component\",\"technology\":\"WEBCOMPONENTMODULE\",\"type\":\"MODULE\"}}\n"
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
                "classifications": [],
                "contact": "onecx@1000kit.org",
                "deprecated": false,
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
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"onecx.tkit.org/v1\",\"kind\":\"Microfrontend\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"onecx-product-store-ui\",\"app.kubernetes.io/instance\":\"onecx-product-store-dev\",\"app.kubernetes.io/managed-by\":\"Helm\",\"app.kubernetes.io/name\":\"onecx-product-store-ui\",\"helm.sh/chart\":\"app-0.20.0\",\"version\":\"1.8.0\"},\"name\":\"onecx-product-store-ui-product-infos\",\"namespace\":\"dev\"},\"spec\":{\"appId\":\"onecx-product-store-ui\",\"appName\":\"onecx-product-store-ui\",\"appVersion\":\"1.8.0\",\"classifications\":[],\"contact\":\"onecx@1000kit.org\",\"deprecated\":false,\"description\":\"Provide Product informations\",\"exposedModule\":\"./OneCXProductInfosComponent\",\"iconName\":null,\"note\":null,\"productName\":\"onecx-product-store\",\"remoteBaseUrl\":\"/mfe/product-store/\",\"remoteEntry\":\"/mfe/product-store/remoteEntry.js\",\"remoteName\":\"onecx-product-store\",\"tagName\":\"ocx-product-infos-component\",\"technology\":\"WEBCOMPONENTMODULE\",\"type\":\"COMPONENT\"}}\n"
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
                "deprecated": false,
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
