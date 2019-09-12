import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';


class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
// ClassicEditor.builtinPlugins = [
// 	Essentials,
// 	UploadAdapter,
// 	Autoformat,
// 	Bold,
// 	Italic,
// 	BlockQuote,
// 	Heading,
// 	Link,
// 	List,
// 	Paragraph,
// 	Alignment
// ];

ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'alignment',                                                 // <--- ADDED
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	// This value must be kept in sync with the language defined in webpack.configs.js.
	language: 'zh-cn'
};

export default ClassicEditor;