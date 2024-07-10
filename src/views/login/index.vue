<script setup>
import LoginBg from './components/index.vue';
import { isMobile } from '@/utils';
import * as Regexp from '@/utils/regexp';
import { useLoading } from '@/hooks';

defineOptions({ name: 'Login' });

const form = reactive({
	username: '',
	password: '',
	sms_code: '',
});

const rules = {
	username: [
		{ required: true, message: '请输入手机号' },
		{ match: Regexp.Phone, message: '手机号格式不正确' },
	],
	password: [
		{ required: true, message: '请输入密码' },
		{ match: Regexp.Password, message: '输入密码格式不正确' },
	],
	sms_code: [{ required: true, message: '请输入验证码' }],
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
					<img class="login-left__icon" src="@/assets/images/login_icon.png" alt="icon" />
					<img class="login-left__tips" src="@/assets/images/login_tips.png" alt="tips" />
				</div>
			</a-col>
			<a-col :xs="24" :sm="12" :md="9">
				<div class="login-right">
					<a-form
						ref="formRef"
						:size="isMobile() ? 'large' : 'large'"
						:model="form"
						:rules="rules"
						:style="{ width: '84%' }"
						:label-col-style="{ display: 'none' }"
						:wrapper-col-style="{ flex: 1 }"
					>
						<h3 class="login-right__title">
							<img class="logo" src="@/assets/images/logo.png" alt="快服务" />
							<span>后台管理系统</span>
						</h3>
						<a-form-item field="username">
							<a-input v-model="form.username" placeholder="手机号" :max-length="11" allow-clear>
								<template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
							</a-input>
						</a-form-item>
						<a-form-item field="password">
							<a-input-password v-model="form.password" placeholder="密码" allow-clear autocomplete>
								<template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
							</a-input-password>
						</a-form-item>
						<a-form-item field="sms_code">
							<a-input v-model="form.sms_code" placeholder="验证码" allow-clear class="sms_input">
								<template #append>
									<img
										src="https://mis3.kfw.net/bmis/v1_0/user/image_code?uu_id=E56831CE-1573-4307-9430-65E1FE76C308"
										alt="验证码"
										class="sms_code"
									/>
								</template>
							</a-input>
						</a-form-item>
						<!--						<a-form-item>-->
						<!--							<a-row justify="end" align="center" class="w-full">-->
						<!--								<a-link status="success">忘记密码</a-link>-->
						<!--							</a-row>-->
						<!--						</a-form-item>-->
						<a-form-item>
							<a-space direction="vertical" fill class="w-full">
								<a-button type="primary" size="large" long :loading="loading" @click="login">开启美好的一天</a-button>
								<a-button type="text" size="large" long class="register-btn">注册账号</a-button>
							</a-space>
						</a-form-item>
					</a-form>
				</div>
			</a-col>
		</a-row>
		<!--		背景 svg-->
		<LoginBg></LoginBg>
		<!--		浅色深色主题切换 icon-->
		<ThemeBtn class="theme-btn"></ThemeBtn>
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
	&__icon {
		width: auto;
		height: 50%;
		position: absolute;
		top: 40%;
		bottom: 0;
		left: 50%;
		right: 0;
		transform: translate(-50%, -50%);
		transition: all 0.3s;
	}
	&__tips {
		width: 70%;
		height: auto;
		position: absolute;
		bottom: 15%;
		left: 50%;
		transform: translateX(-50%);
		transition: all 0.3s;
	}
}

.login-right {
	width: 100%;
	height: 100%;
	background: var(--color-bg-1);
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	&__title {
		color: var(--color-text-1);
		font-weight: 500;
		font-size: 18px;
		line-height: 32px;
		margin-bottom: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.logo {
			width: 60px;
			height: 60px;
			margin-right: 10px;
		}
	}
	.sms_input {
		:deep(.arco-input-append) {
			padding: 0;
		}
		.sms_code {
			width: 100px;
			height: 35px;
			border-radius: 4px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			cursor: pointer;
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
