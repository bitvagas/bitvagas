bitvagas
================
Platform of Jobs for Bitcoin Users.

##Tools

* NodeJS + Express
* Sequelize + Postgre SQL
* Passport
* AngularJS
* HarpJS
* BrowserSync


##Usage

####Install the npm dependencies:

`$ npm install`

####Install the bower dependencies:

`$ bower install`

####Database

We use [postgres](http://www.postgresql.org/download/), you can setup your database  for each environment by `psql` command.

`$ psql -h localhost -U postgres -p 5433`

inside postgres

`# create database bitvagas_dev;` for development

`# create database bitvagas_test;` for tests

`# create database bitvagas;` for production

`# \l` to list your databases created

`# \c bitvagas_dev` to change your current database.

after run application sequelize will create our tables.

####Export your database variables

We use [sequelize](http://sequelizejs.com/) to map our database, you need export your variables to set up.

`$ export user=username` => default : postgres

`$ export password=password`

if you running postgres on a diferent port ([see this issue](https://github.com/bitvagas/bitvagas/issues/1))

`$ export port=5433` => default : 5432

####NodeMailer variables

export your email variables to setup nodemailer, we using Gmail Smtp for now, but probably will be changed later.

`$ export email=youremail@gmail.com`

`$ export mailPass=youremailPassword`

####Run with:

`$ gulp`

Open your browser at `http://localhost:9000`

##Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

##License
[GPL License](./LICENSE) © BitVagas
  