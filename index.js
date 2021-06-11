module.exports = async ({ chainWebpack, log }, pluginOptions) => {
  const { themeConfig, libraryName = 'antd' } = pluginOptions || {};
  chainWebpack((config) => {
    if (themeConfig) {
      log.info(`自定义 ${libraryName} 组件主题变量：`, themeConfig);
    }
    ['less', 'less-module'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('less-loader')
        .tap((options) => {
          options.modifyVars = {
            ...options.modifyVars,
            ...themeConfig,
          };
          return options;
        });
    });
  });
};
