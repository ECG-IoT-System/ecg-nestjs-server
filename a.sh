npm run build
cp ormconfig.production.json ormconfig.json
gcloud app deploy --quiet app.yaml
cp ormconfig.development.json ormconfig.json