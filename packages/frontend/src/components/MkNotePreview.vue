<template>
<div :class="$style.root">
	<MkAvatar :class="$style.avatar" :user="$i" link preview/>
	<div :class="$style.main">
		<div :class="$style.header">
			<MkUserName :user="$i"/>
		</div>
		<div>
			<div :class="$style.content">
				<Mfm :text="text.trim()" :author="$i" :i="$i"/>
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts" setup>
import { } from 'vue';

const props = defineProps<{
	text: string;
}>();
</script>

<style lang="scss" module>
.root {
	display: flex;
	margin: 0;
	padding: 0;
	overflow: clip;
	font-size: 0.95em;
}

.avatar {
	flex-shrink: 0 !important;
	display: block !important;
	margin: 0 10px 0 0 !important;
	width: 40px !important;
	height: 40px !important;
	border-radius: 8px !important;
	pointer-events: none !important;
}

.main {
	flex: 1;
	min-width: 0;
}

.header {
	margin-bottom: 2px;
	font-weight: bold;
}

@container (min-width: 350px) {
	.avatar {
		margin: 0 10px 0 0 !important;
		width: 44px !important;
		height: 44px !important;
	}
}

@container (min-width: 500px) {
	.avatar {
		margin: 0 12px 0 0 !important;
		width: 48px !important;
		height: 48px !important;
	}
}
</style>