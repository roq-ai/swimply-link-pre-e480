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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPreviewPageById, updatePreviewPageById } from 'apiSdk/preview-pages';
import { Error } from 'components/error';
import { previewPageValidationSchema } from 'validationSchema/preview-pages';
import { PreviewPageInterface } from 'interfaces/preview-page';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { HostInterface } from 'interfaces/host';
import { getHosts } from 'apiSdk/hosts';

function PreviewPageEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PreviewPageInterface>(
    () => (id ? `/preview-pages/${id}` : null),
    () => getPreviewPageById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PreviewPageInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePreviewPageById(id, values);
      mutate(updated);
      resetForm();
      router.push('/preview-pages');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PreviewPageInterface>({
    initialValues: data,
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
            Edit Preview Page
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'preview_page',
  operation: AccessOperationEnum.UPDATE,
})(PreviewPageEditPage);
