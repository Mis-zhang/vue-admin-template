import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 支持 jsx 写法
import vuejsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
// 打包分析依赖
import { visualizer } from 'rollup-plugin-visualizer';
// 通过监听文件修改，自动重启 vite 服务
import ViteRestart from 'vite-plugin-restart';
// vue api 自动导入
import AutoImport from 'unplugin-auto-import/vite';
// 组件自动导入
import Components from 'unplugin-vue-components/vite';
// 自动导入 Arco UI  库组件
import { vitePluginForArco } from '@arco-plugins/vite-vue';
// 使用 .svg 文件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// 使用 gzip 来压缩资源
import viteCompression from 'vite-plugin-compression';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vuejsx(),
		vueDevTools(),
		visualizer({ open: true }),
		ViteRestart({ restart: ['vite.config.[jt]s'] }),
		AutoImport({
			imports: ['vue', 'vue-router'],
			dts: false,
		}),
		Components({
			dirs: ['src/components'],
			extensions: ['vue', 'tsx'],
			// 配置文件生成位置
			dts: false,
		}),
		vitePluginForArco({
			style: 'css',
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
		}),
		viteCompression({
			algorithm: 'gzip',
			threshold: 10240,
			verbose: true,
			deleteOriginFile: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要忽略的扩展名列表
	},
	// 引入sass全局样式变量
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/var.scss";`,
			},
		},
		postcss: {
			plugins: [postcssPresetEnv()],
		},
	},
	server: {
		host: '0.0.0.0',
		hmr: true,
		open: true,
		proxy: {},
	},
});
