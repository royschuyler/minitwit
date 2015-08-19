Feature: Autocomplete mention
  As a tweeter
  I want to have autocompleted mentions
  So that I don't have to spend time remembering usernames

  Scenario: Writing a mention
    Given I am writing a tweet
    When I mention another user
    Then I should see options for autocompletion
