# Martians Library

Example projecto for "GraphQL on Rails" tutorial:

- [From zero to the first query](https://evilmartians.com/chronicles/graphql-on-rails-1-from-zero-to-the-first-query)—setting up a project, adding first queries to both back-end and front-end applications.
- [Updating the data](https://evilmartians.com/chronicles/graphql-on-rails-2-updating-the-data)—adding mutations.
- [On the way to perfection](https://evilmartians.com/chronicles/graphql-on-rails-3-on-the-way-to-perfection)—adding subscriptions, and some refactoring.

## How to run on local machine

TBD

## How to run with Docker

You need `docker` and `docker-compose` installed (for MacOS just use [official app](https://docs.docker.com/engine/installation/mac/)).

##№ Provisioning

Run the following commands to prepare your Docker dev env:

```sh
$ docker-compose build
$ docker-compose run runner yarn install
$ docker-compose run runner ./bin/setup
```

It builds the Docker image, installs Ruby and NodeJS dependencies, creates database, run migrations and seeds.

You're all set! Now you're ready to code!

## Commands

* Running the app:

You can run the Rails up using the following command:

```sh
$ docker-compose up rails
```

If you want to run Webpack Dev server as well:

```sh
$ docker-compose up rails webpacker
```

## Dip

You can also use [`dip`](https://github.com/bibendi/dip)–CLI utility for straightforward provisioning and interacting with an applications configured by `docker-compose`.

To install `dip` copy and run the command below:

```sh
$ gem install dip
```

Then use the following commands:

```sh
# provision application
dip provision

# run web app with all debuging capabilities (i.e. `binding.pry`)
dip rails s

# run rails console
dip rails c

# run webpacker dev server
dip up -d webpacker
# `-d` - mean that service will run in detached (background) mode
```
