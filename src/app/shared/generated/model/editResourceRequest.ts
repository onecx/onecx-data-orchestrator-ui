/**
 * onecx-data-orchestrator-bff
 * OneCX Data Orchestrator BFF
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: tkit_dev@1000kit.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CustomResourceMicroservice } from './customResourceMicroservice';
import { CustomResourceSlot } from './customResourceSlot';
import { CustomResourceKeycloakClient } from './customResourceKeycloakClient';
import { CustomResourceParameter } from './customResourceParameter';
import { CustomResourceData } from './customResourceData';
import { CustomResourceDatabase } from './customResourceDatabase';
import { CustomResourceMicrofrontend } from './customResourceMicrofrontend';
import { CustomResourcePermission } from './customResourcePermission';
import { CustomResourceProduct } from './customResourceProduct';


export interface EditResourceRequest { 
    CrdData?: CustomResourceData;
    CrdDatabase?: CustomResourceDatabase;
    CrdKeycloakClient?: CustomResourceKeycloakClient;
    CrdMicrofrontend?: CustomResourceMicrofrontend;
    CrdMicroservice?: CustomResourceMicroservice;
    CrdPermission?: CustomResourcePermission;
    CrdProduct?: CustomResourceProduct;
    CrdSlot?: CustomResourceSlot;
    CrdParameter?: CustomResourceParameter;
}

