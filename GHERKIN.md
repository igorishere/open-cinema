# Template de Historia com Gherkin

```gherkin
Feature: [Nome da funcionalidade]
  Como [tipo de usuario]
  Eu quero [objetivo ou acao]
  Para [beneficio ou valor gerado]

  Background:
    Given [condicao comum aos cenarios]
    And [outra condicao comum, se necessario]

  Scenario: [Comportamento esperado]
    Given [contexto inicial]
    When [acao executada]
    Then [resultado esperado]
    And [resultado complementar, se necessario]

  Scenario: [Comportamento alternativo ou erro]
    Given [contexto inicial]
    When [acao executada]
    Then [resultado esperado]
    But [restricao ou excecao, se necessario]

  Scenario Outline: [Comportamento com multiplas entradas]
    Given [contexto inicial com "<entrada>"]
    When [acao executada]
    Then [resultado esperado deve ser "<saida>"]

    Examples:
      | entrada | saida |
      | [valor] | [resultado esperado] |
      | [valor] | [resultado esperado] |
```
