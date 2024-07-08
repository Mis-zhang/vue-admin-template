<script setup>
import { isMobile } from '@/utils';
import * as Regexp from '@/utils/regexp';
import { useLoading } from '@/hooks';

defineOptions({ name: 'Login' });

const form = reactive({
	username: '',
	password: '',
});

const rules = {
	username: [{ required: true, message: '请输入账号' }],
	password: [
		{ required: true, message: '请输入密码' },
		{ match: Regexp.Password, message: '输入密码格式不正确' },
	],
};

const { loading, setLoading } = useLoading();
const errorMessage = ref('');
const formRef = ref();
const login = () => {};
</script>

<template>
	<div class="login">
		<a-row align="stretch" class="login-box">
			<a-col :xs="0" :sm="12" :md="15">
				<div class="login-left">
					<!--					<img class="login-left__img" src="@/assets/svgs/login-img.svg" />-->
				</div>
			</a-col>
			<a-col :xs="24" :sm="12" :md="9">
				<div class="login-right">
					<a-form
						ref="formRef"
						:size="isMobile() ? 'large' : 'medium'"
						:model="form"
						:rules="rules"
						:style="{ width: '84%' }"
						:label-col-style="{ display: 'none' }"
						:wrapper-col-style="{ flex: 1 }"
					>
						<h3 class="login-right__title">
							<!--							<img class="logo" src="@/assets/images/logo.gif" /><span>Admin Pro</span>-->
						</h3>
						<a-form-item field="username">
							<a-input v-model="form.username" placeholder="账号 admin/user" allow-clear>
								<template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
							</a-input>
						</a-form-item>
						<a-form-item field="password">
							<a-input-password v-model="form.password" placeholder="密码" allow-clear autocomplete>
								<template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
							</a-input-password>
						</a-form-item>
						<a-form-item>
							<a-row justify="end" align="center" class="w-full">
								<a-link>忘记密码</a-link>
							</a-row>
						</a-form-item>
						<a-form-item>
							<a-space direction="vertical" fill class="w-full">
								<a-button type="primary" size="large" long :loading="loading" @click="login">登录</a-button>
								<a-button type="text" size="large" long class="register-btn">注册账号</a-button>
							</a-space>
						</a-form-item>
					</a-form>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped lang="scss">
.login {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-bg-5);

	&-box {
		width: 86%;
		max-width: 720px;
		height: 380px;
		display: flex;
		z-index: 999;
		box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
	}
}

.login-left {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));

	&__img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transition: all 0.3s;
		object-fit: cover;
	}
}

.login-right {
	width: 100%;
	height: 100%;
	background: var(--color-bg-1);
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 30px;
	box-sizing: border-box;

	&__title {
		color: var(--color-text-1);
		font-weight: 500;
		font-size: 20px;
		line-height: 32px;
		margin-bottom: 20px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;

		.logo {
			width: 32px;
			height: 32px;
			margin-right: 6px;
		}
	}
}

.register-btn,
.register-btn:hover {
	color: var(--color-text-2);
}

.theme-btn {
	position: fixed;
	top: 20px;
	left: 30px;
	z-index: 9999;
}
</style>
