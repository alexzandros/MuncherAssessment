import type {AWS} from '@serverless/typescript';


const serverlessConfiguration: AWS = {
    service: "muncheraccount",
    plugins:['serverless-esbuild','serverless-offline'],
    provider: {
        name: "aws",
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        lambdaHashingVersion:'20201221'
    },
    functions:{
        getUsers:{
            handler:"src/functions/User.getUsers",
            events:[{
                http:{
                    path:"users",
                    method:"get",
                    cors: true
                }
            }]
        },
        getProducts:{
            handler:"src/functions/Product.getProducts",
            events:[{
                http:{
                    path:"products",
                    method:"get",
                    cors: true
                }
            }]
        }
    },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
}

module.exports = serverlessConfiguration;