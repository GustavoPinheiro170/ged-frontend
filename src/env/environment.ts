import { EnvType } from "src/models/host-config.model";


export const environment = {
  stage: EnvType.local,
  backendHost: 'http://localhost:8085/v1/ged',
};
