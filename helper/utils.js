export const getIcon = type => {
	switch(type) {
		case 'birth':
			return require('../assets/images/form_birthdate/form_birthdate.png');
		case 'adoption':
			return require('../assets/images/form_hometown/form_hometown.png');
		case "rescue":
			return require('../assets/images/form_rescue/form_rescue.png');
		default:
			return require('../assets/images/form_photo/form_photo.png');
	}
}