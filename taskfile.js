const notifier = require('node-notifier')

const babelClientOpts = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          esmodules: true,
        },
        loose: true,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        helpers: true,
        regenerator: false,
        useESModules: false,
      },
    ],
  ],
}

export async function build(task, opts) {
  await task
    .source(opts.src || 'src/**/*.+(js|ts|tsx)')
    .babel(babelClientOpts)
    .target('dist/')
  notify('Compiled client files')
}

export default async function(task) {
  await task.clear('dist')
  await task.start('build')
}

// notification helper
function notify(msg) {
  return notifier.notify({
    title: '▲ Next',
    message: msg,
    icon: false,
  })
}
