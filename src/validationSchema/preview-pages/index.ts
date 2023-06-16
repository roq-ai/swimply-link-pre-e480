import * as yup from 'yup';

export const previewPageValidationSchema = yup.object().shape({
  link: yup.string().required(),
  host_id: yup.string().nullable(),
});
