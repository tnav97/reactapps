# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.12.0](https://github.com/Alcumus/react-apps/compare/@alcumus/core@0.1.0...@alcumus/core@2.12.0) (2022-08-15)


### Bug Fixes

* **@alcumus/core:** fix isEnabled to only accept 'true' and 'on' as enabled values, add tests ([36ecba3](https://github.com/Alcumus/react-apps/commit/36ecba3ef117e7f4727a1a4b2c4c4edc84f1793f))
* **alcumus-portal:** add user and edit user forms to add user in the correct organization ([8d6c0d6](https://github.com/Alcumus/react-apps/commit/8d6c0d6b14aebd431613b50f60e35f332b1bd5d5))
* **ARC-522:** server side now passes x-api-key to services. ([2f8df80](https://github.com/Alcumus/react-apps/commit/2f8df804b06ae6e7b1de800f1d88e1057b01ffce))
* **ARC-985:** Implemented refreshing more frequently and touching session when we do. ([c346990](https://github.com/Alcumus/react-apps/commit/c3469904cdd44b43183467e8566b8f4bcd142790))
* **ARC-987:** now propagating real server errors to user and showing less log info. ([8603a2d](https://github.com/Alcumus/react-apps/commit/8603a2dbf17e856eb4e479ed3a9af560afd6cbda))
* Fix dependencies using syncpack:fix ([f07f879](https://github.com/Alcumus/react-apps/commit/f07f879fa0ab211cc42f7a30205291966e49d26d))
* fix typescript to version 4.5.5 ([cbc26b6](https://github.com/Alcumus/react-apps/commit/cbc26b666b8f0a1fe30611abede22e7c26e9f8ab))
* logic which gets env value ([1e4feb8](https://github.com/Alcumus/react-apps/commit/1e4feb8a2c7422d2cb9192457c7b2db70155b10f))
* Run syncpack:fix to resolve dependency issues ([5ae6d6f](https://github.com/Alcumus/react-apps/commit/5ae6d6f89117c3b4ab52378eb9879f142a618147))
* **self-signup:** fix imports ([1031604](https://github.com/Alcumus/react-apps/commit/1031604346b7301d31716546dcc28f001338262d))


### Features

* **alcumus-portal:** Add organization picker with search ([0e2c0b1](https://github.com/Alcumus/react-apps/commit/0e2c0b1f44459a5fc7d019bb18028a01087919b8))
* **alcumus-portal:** Hide organization picker when user does not have more than one organization ([b20ec26](https://github.com/Alcumus/react-apps/commit/b20ec268683338a40d10ba68106f0fc27e48ed8a))
* **alcumus-portal:** subscribe organization to application ([b8e677c](https://github.com/Alcumus/react-apps/commit/b8e677ca1b3014a8edd5a5ccc6732d340263c333))
* **core:** Add jsonwebtoken package to core ([15b562f](https://github.com/Alcumus/react-apps/commit/15b562fa2e9a242f9f86cb02d6bd3058d839bdcb))
* **core:** Add new middlewares to work with CSRF protection ([c2ac2ed](https://github.com/Alcumus/react-apps/commit/c2ac2edb9b6bc69f808f8f0c0484db0b28af75a8))
* **core:** Add uuid package and fix dependency issues ([2c8bc9a](https://github.com/Alcumus/react-apps/commit/2c8bc9aa1bd2c658826a18488ccd9020d416bb8a))
* **core:** Add x-api-key header through RequestHeaders constant ([223cb54](https://github.com/Alcumus/react-apps/commit/223cb5463554486cd8e956a79f3cd0496fab6943))
* **portal:** fix redux calls ([0be2f8c](https://github.com/Alcumus/react-apps/commit/0be2f8ccb50fa56a68940a30771a74bfd7f212c7))
* **self-signup:** add client-side and server-side recaptcha checks under a feature toggle ([5a65584](https://github.com/Alcumus/react-apps/commit/5a655844b3b939b5c7d14098518bc927cb7d9b66))
* upgrade typescript related packages ([df90c3c](https://github.com/Alcumus/react-apps/commit/df90c3cbb789e1bda6592ae2d0528e36513699f6))
* web-app detects languages and loads translations ([e85ca96](https://github.com/Alcumus/react-apps/commit/e85ca96d189721a51a795b978fe2eb87d928f4b8))





# [2.9.0](https://github.com/Alcumus/react-apps/compare/@alcumus/core@2.7.0...@alcumus/core@2.9.0) (2022-07-01)


### Bug Fixes

* **ARC-985:** Implemented refreshing more frequently and touching session when we do. ([c346990](https://github.com/Alcumus/react-apps/commit/c3469904cdd44b43183467e8566b8f4bcd142790))
* **ARC-987:** now propagating real server errors to user and showing less log info. ([8603a2d](https://github.com/Alcumus/react-apps/commit/8603a2dbf17e856eb4e479ed3a9af560afd6cbda))





# [2.7.0](https://github.com/Alcumus/react-apps/compare/@alcumus/core@0.1.0...@alcumus/core@2.7.0) (2022-06-03)


### Bug Fixes

* **@alcumus/core:** fix isEnabled to only accept 'true' and 'on' as enabled values, add tests ([36ecba3](https://github.com/Alcumus/react-apps/commit/36ecba3ef117e7f4727a1a4b2c4c4edc84f1793f))
* **alcumus-portal:** add user and edit user forms to add user in the correct organization ([8d6c0d6](https://github.com/Alcumus/react-apps/commit/8d6c0d6b14aebd431613b50f60e35f332b1bd5d5))
* **ARC-522:** server side now passes x-api-key to services. ([2f8df80](https://github.com/Alcumus/react-apps/commit/2f8df804b06ae6e7b1de800f1d88e1057b01ffce))
* Fix dependencies using syncpack:fix ([f07f879](https://github.com/Alcumus/react-apps/commit/f07f879fa0ab211cc42f7a30205291966e49d26d))
* fix typescript to version 4.5.5 ([cbc26b6](https://github.com/Alcumus/react-apps/commit/cbc26b666b8f0a1fe30611abede22e7c26e9f8ab))
* logic which gets env value ([1e4feb8](https://github.com/Alcumus/react-apps/commit/1e4feb8a2c7422d2cb9192457c7b2db70155b10f))
* Run syncpack:fix to resolve dependency issues ([5ae6d6f](https://github.com/Alcumus/react-apps/commit/5ae6d6f89117c3b4ab52378eb9879f142a618147))
* **self-signup:** fix imports ([1031604](https://github.com/Alcumus/react-apps/commit/1031604346b7301d31716546dcc28f001338262d))


### Features

* **alcumus-portal:** Add organization picker with search ([0e2c0b1](https://github.com/Alcumus/react-apps/commit/0e2c0b1f44459a5fc7d019bb18028a01087919b8))
* **alcumus-portal:** Hide organization picker when user does not have more than one organization ([b20ec26](https://github.com/Alcumus/react-apps/commit/b20ec268683338a40d10ba68106f0fc27e48ed8a))
* **alcumus-portal:** subscribe organization to application ([b8e677c](https://github.com/Alcumus/react-apps/commit/b8e677ca1b3014a8edd5a5ccc6732d340263c333))
* **core:** Add jsonwebtoken package to core ([15b562f](https://github.com/Alcumus/react-apps/commit/15b562fa2e9a242f9f86cb02d6bd3058d839bdcb))
* **core:** Add new middlewares to work with CSRF protection ([c2ac2ed](https://github.com/Alcumus/react-apps/commit/c2ac2edb9b6bc69f808f8f0c0484db0b28af75a8))
* **core:** Add uuid package and fix dependency issues ([2c8bc9a](https://github.com/Alcumus/react-apps/commit/2c8bc9aa1bd2c658826a18488ccd9020d416bb8a))
* **core:** Add x-api-key header through RequestHeaders constant ([223cb54](https://github.com/Alcumus/react-apps/commit/223cb5463554486cd8e956a79f3cd0496fab6943))
* **portal:** fix redux calls ([0be2f8c](https://github.com/Alcumus/react-apps/commit/0be2f8ccb50fa56a68940a30771a74bfd7f212c7))
* **self-signup:** add client-side and server-side recaptcha checks under a feature toggle ([5a65584](https://github.com/Alcumus/react-apps/commit/5a655844b3b939b5c7d14098518bc927cb7d9b66))
* upgrade typescript related packages ([df90c3c](https://github.com/Alcumus/react-apps/commit/df90c3cbb789e1bda6592ae2d0528e36513699f6))
* web-app detects languages and loads translations ([e85ca96](https://github.com/Alcumus/react-apps/commit/e85ca96d189721a51a795b978fe2eb87d928f4b8))





# [0.1.0](https://github.com/Alcumus/react-apps/compare/@alcumus/core@0.0.1...@alcumus/core@0.1.0) (2021-10-21)


### Features

* **core:** Add ProcessEnv to core utilities ([738fd19](https://github.com/Alcumus/react-apps/commit/738fd19c9dc0f3ec4f0d2123f2542bd038d9f531))





## 0.0.1 (2021-10-18)


### Features

* Add @alcumus/core package to add common use things for all frontends ([9678948](https://github.com/Alcumus/react-apps/commit/96789488b71dc310ffe2046397bfb372ad4c5944))
* **core:** Add constants and types required to work with redirection flow ([abdf68e](https://github.com/Alcumus/react-apps/commit/abdf68e3ab823045eedf8eb762d972c1d2a0c9fb))
* **core:** expose AxiosResponse through Types ([d1a5038](https://github.com/Alcumus/react-apps/commit/d1a50388fee79b0c264a1cdd5870e1cd9ad84bd1))
* integrate the redirection flow with portal ([ab17995](https://github.com/Alcumus/react-apps/commit/ab17995ba2f8e187c9c93be199865bcc6815e65b))
