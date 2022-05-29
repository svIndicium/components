<template>
	<v-radio-group
		v-model="internalValue"
		:row="isHorizontal"
		:column="!isHorizontal"
		@change="onChange"
	>
		<template #label>
			<slot />
		</template>
		<v-radio
			v-for="(option, index) in options"
			:key="index"
			:disabled="option.disabled"
			:value="index"
		>
			<template #label>
				<slot :option="option" name="option">
					{{ option.translationKey | locale | capitalize }}
				</slot>
			</template>
		</v-radio>
	</v-radio-group>
</template>

<script lang="ts">
	import Vue from "vue"
	import { Component, Emit, Prop, Watch } from "vue-property-decorator"

	import { cloneDeep, isEqual } from "lodash-es"

	import { OptionModel, RadioButtonGroupDirection } from "../../../components/ui/input"
	import { HTMLEvent } from "../../../utils/Events"

	@Component
	export default class IRadioButtonGroup<T extends OptionModel> extends Vue {
		@Prop({ type: Array, default: () => [] }) options!: Array<OptionModel>
		@Prop({ type: String, default: RadioButtonGroupDirection.VERTICAL }) direction!: RadioButtonGroupDirection

		@Prop({ type: [String, Number, Boolean, Object] }) value?: string | number | boolean | object

		internalValue = -1

		get isHorizontal(): boolean {
			return this.direction === RadioButtonGroupDirection.HORIZONTAL
		}

		@Watch("options", { immediate: true, deep: true })
		@Watch("value", { immediate: true, deep: true })
		valueChanged(): void {
			this.internalValue = this.options.findIndex(option => isEqual(option.value, this.value))
		}

		@Emit(HTMLEvent.INPUT)
		@Emit(HTMLEvent.CHANGE)
		onChange(): T {
			const selected = this.options[this.internalValue]?.value
			return cloneDeep(selected)
		}
	}
</script>
