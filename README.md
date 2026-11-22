# onecx-data-orchestrator-ui
OneCX Data Orchestrator User Interface

## Local Development

Steps with example commands:

* Exceute in local environment root directory
  - Start local environment
  - Integrate local Data Orchestra3tor App into OneCX (default port: 5010)
    - ``./toggle-mfes.sh -a data::/mfe/data-orchestrator``

* Exceute in Data Orchestrator UI root directory
  - Start Data Orchestrator UI App
    - ``npm run start -- --port 5010 --public-host=http://localhost:5010``
  - Start Mock Server
    - ``node mockserver/data-orchestrator-mock-server.js``
