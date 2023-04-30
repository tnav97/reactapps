# Helmfile setup

## What is helmfile and why do we use it?

**Helmfile** is a layer of abstraction over **Helm**, which in turn is a layer over **Kubernetes**. Using **Helmfile** allows us to modify values being used in our **Helm** charts depending on the environment easily.

## Helmfile templating language

Helmfiles use the same templating language (**Go** templates) using by Helm, with subtle differences. 

Read more: https://github.com/roboll/helmfile#templating

Helmfile and Helm both add useful template functions for iteration, encoding-decoding, text manipulation etc. that makes writing k8s configurations easy.

### YAML and Go templates

Helm and Kubernetes understand and accept YAML as inputs. Both Helm and Helmfile uses Go templates to add templating to YAML files. 

Go templates do not understand YAML, they're built to work with any text document, including HTML, raw text or YAMLs. So, be careful when using Go templates, and always think - will my template's output be valid YAML?

If you want a deeper dive into how Go templates (outside of Helm / Helmfile) work, here's a good guide: https://levelup.gitconnected.com/learn-and-use-templates-in-go-aa6146b01a38

**(Recommended)** Here's a good guide to understand Helm's templating (lots of overlap with Helmfile): https://helm.sh/docs/chart_template_guide/functions_and_pipelines/

## How the current Helmfile.yaml works

The current `helmfile.yaml` is setup so that:

- adding new charts is easy
- chart values are never duplicated and there are no cascading overrides in 5 different places
- environment-specific overrides are easy to add

The `helmfile.yaml` reads the `.deployReleases` from the environment, then:

- Passes common variables for environment to the chart
- The `variables.yaml` for the chart is read, and the environment variables are resolved, sent to the chart
- Any environment-specific overrides are applied from `overrides` key in `.deployReleases` of the environment file

### What values are passed to the charts?

To each chart, the following structure is passed:

```yaml
Values:
  container:
    # All chart specific environment variables that are declared and present, examples:
    SELF_SIGNUP_PORT: 8010
  secrets:
    # All chart specific secret environment variables that are declared and present, examples:
    SELF_SIGNUP_SECRET: 'test-secret'
    # Note: just a demonstration, in reality the secret is passed as base64 encoded string (the standard)
  common:
    # Set of shared common values that can be used by all charts
    image:
      tag:
      name:
    host:
    network:
    external:
```

You can use the following generic ConfigMap and Secret in your chart to keep things simple:

```yaml
# charts/your-chart/configMap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
  namespace: {{ .Release.Namespace }}
data: {{ .Values.container | toRawJson }}
```

```yaml
# charts/your-chart/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: {{ .Release.Name }}-secret
  namespace: {{ .Release.Namespace }}
type: Opaque
data: {{ .Values.secrets | toRawJson }}
```


### Adding a new chart

In order for a new chart to work with the helmfile, here is a list of things to do:

1. Copy-paste the `starter-chart` directory, and change the name to match your app. Most default files should be good, except `Chart.yaml` and `deployment.yaml` which may need some changes.
2. Update the `/charts/[your-chart]/variables.yaml` to reflect what the required, optional configuration and secrets your chart / app uses.
3. Add your chart entry to `/charts/environments/*.yaml` files, dependending on where you want it deployed.