# Composer Module project

## Getting started

Please refer to [Composer Module development documentation](http://enterprise-docs.appgyver.com/docs/custom-module-getting-started) for in-depth instructions.

## Initial Setup:

Install dependencies:

    make install

Connect your module to an existing Composer application. [Retrieve your application-specific command from Composer:](https://composer2.appgyver.com/modules/connect)

    steroids module init <arguments from Composer>

When your Composer application configuration changes:

    steroids module refresh

## Development

The module development environment is used through `steroids connect`. Run the following command:

    steroids connect --watch=src

The mobile version of your module will be accessible as a regular Steroids application would be. The Steroids Connect screen has a *module* tab where you can work with the module as it would appear on the web.

## Deployment

Deploy your module to make it available for Composer applications:

    steroids module deploy
