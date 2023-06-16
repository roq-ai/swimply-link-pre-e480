import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPreviewPage } from 'apiSdk/preview-pages';
import { Error } from 'components/error';
import { previewPageValidationSchema } from 'validationSchema/preview-pages';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { HostInterface } from 'interfaces/host';
import { getHosts } from 'apiSdk/hosts';
import { PreviewPageInterface } from 'interfaces/preview-page';

function PreviewPageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PreviewPageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPreviewPage(values);
      resetForm();
      router.push('/preview-pages');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PreviewPageInterface>({
    initialValues: {
      link: '',
      host_id: (router.query.host_id as string) ?? null,
    },
    validationSchema: previewPageValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Preview Page
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="link" mb="4" isInvalid={!!formik.errors?.link}>
            <FormLabel>Link</FormLabel>
            <Input type="text" name="link" value={formik.values?.link} onChange={formik.handleChange} />
            {formik.errors.link && <FormErrorMessage>{formik.errors?.link}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<HostInterface>
            formik={formik}
            name={'host_id'}
            label={'Select Host'}
            placeholder={'Select Host'}
            fetcher={getHosts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'preview_page',
  operation: AccessOperationEnum.CREATE,
})(PreviewPageCreatePage);
