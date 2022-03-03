import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import react from 'react';
import reactDom from 'react-dom';
import terser from "rollup-plugin-terser";

const format = process.env.FORMAT === 'cjs' ? 'cjs' : 'iife';
const env = process.env.NODE_ENV;

export default {
    input: 'src/index.jsx',
    output: [
        {
            format,
        }
    ],
    plugins: [
        resolve({
            extensions: ['.jsx', '.js'],
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
              react: Object.keys(react),
              'react-dom': Object.keys(reactDom)
            }
          }),
        babel({
            exclude: './node_modules/**'
        }),
        (env === 'production' && terser.terser()),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env || 'development'),
        }),
        
        postcss({

            extensions: ['.css'],
        }),
    ]
}