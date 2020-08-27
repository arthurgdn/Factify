//entry ->output 
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if(process.env.NODE_ENV ==='test'){
    require('dotenv').config({ path:'./.env.development' })
}else if(process.env.NODE_ENV ==='development'){
    require('dotenv').config({path:'./.env.development'})
}
module.exports = (env)=>{
    const isProduction = env==='production'
    const CSSExtract = new ExtractTextPlugin('styles.css')
    return {
        entry: ['babel-polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname,'public','dist'),
            filename:'bundle.js'
        },
        module: {
            rules:[
                {
                loader : 'babel-loader',
                test: /\.js$/,
                exclude : /node_modules/
            },{
            use :CSSExtract.extract({
                use : [{loader:'css-loader',options:{sourceMap:true}},{loader:'sass-loader',options:{sourceMap:true}}]
            }),
            test:/\.s?css$/
        }
        ]
        },
        plugins : [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.DEV_URL' : JSON.stringify(process.env.DEV_URL),
                'process.env.PORT' : JSON.stringify(process.env.PORT)
            })
        ],
        devtool : isProduction ? 'source-map' : 'inline-source-map',
        devServer:{
            contentBase:path.join(__dirname,'public'),
            historyApiFallback:true,
            publicPath: '/dist/'
        }
}

}
//loader transform every JSX to regular JS

