# Get started

## Prerequisite
[Install these first before getting started](https://github.com/jeroenouw/HyperledgerFabricAngular/blob/master/docs/PREREQUISITE.md)

## Steps
1. [Clone the repo](#1-clone-the-repo)
2. [Setup Fabric](#2-setup-fabric)
3. [Generate the Business Network Archive](#3-generate-the-business-network-archive)
4. [Deploy to Fabric](#4-deploy-to-fabric)
5. [Run Application](#5-run-application)
6. [Create Participants](#6-create-participants)
7. [Execute Transactions](#7-execute-transactions)

## 1. Clone the repo

Clone the `code` locally. In a terminal, run:

`git clone https://github.com/jeroenouw/HyperledgerFabricAngular`

## 2. Setup Fabric

These commands will kill and remove all running containers, and should remove all previously created Hyperledger Fabric chaincode images:

```none
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

Set Hyperledger Fabric version to v1.0:

`export FABRIC_VERSION=hlfv1`

All the scripts will be in the directory `/fabric-tools`.  Start fabric and create peer admin card:

```
cd fabric-tools/
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

## 3. Generate the Business Network Archive

Use Composer to create a Business Network Definition and export it as an archive (.bna). This is a comprised of Model(.cto), Script(.js), Access Control(.acl) and Query(.qry) files.  
Next generate the .bna file from the root directory:

```
cd ../
npm install
```

The `composer archive create` command in `package.json` has created a file called `decentralized-finance-network.bna` in the `dist` folder. 


## 4. Deploy to Fabric

Now, we are ready to deploy the business network to Hyperledger Fabric. This requires the Hyperledger Composer chaincode to be installed on the peer,then the business network archive (.bna) must be sent to the peer, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.

First, install the composer runtime:

```
cd dist/
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName decentralized-finance-network
```

Deploy the business network:

```
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile decentralized-finance-network.bna --file networkadmin.card
```

Import the network administrator identity as a usable business network card:
```
composer card import --file networkadmin.card
```

Check that the business network has been deployed successfully, run the following command to ping the network:
```
composer network ping --card admin@decentralized-finance-network
```

## 5. Run Application

First, go into the `client` folder and install the dependency:

```
cd ../client/
npm install
```

To start the application:
```
npm start
```  
This command will run: 
```  
concurrently \"ng serve --host 0.0.0.0\" \"npm run app\"
``` 
followed by:
```
composer-rest-server -c admin@decentralized-finance-network -n never -w true
```

The application should now be running at:  
`http://localhost:4200`

The REST server to communicate with network is available here:  
`http://localhost:3000/explorer/`

## 6. Create Participants

Once the application opens, create participants and fill in data. Create Freelancers, Banks and Clients.

## 7. Execute Transactions

Execute transactions manually between Freelancers, Freelancer and Bank, and Freelancer and Client.  After executing transactions, ensure the participants account values are updated.

At the end of your session, stop fabric:

```
cd ~/fabric-tools
./stopFabric.sh
./teardownFabric.sh
```
