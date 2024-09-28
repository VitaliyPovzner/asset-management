awslocal s3api create-bucket --bucket assets 

awslocal rds create-db-cluster \
    --db-cluster-identifier db1 \
    --engine aurora-postgresql \
    --database-name test \
    --master-username myuser \
    --master-user-password mypassword \

echo "Resources created successfully !"
