import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import { EngLevelEnum } from "@/common/models/EngLevelEnum";
import { PositionEnum } from "@/common/models/PositionEnum";
import {
  DURATION_MIN_ERROR,
  DURATION_REQUIRED_ERROR,
  ENG_LEVEL_REQUIRED_ERROR,
  LOCATION_REQUIRED_ERROR,
  POSITION_REQUIRED_ERROR,
  RATE_MIN_ERROR,
  RATE_REQUIRED_ERROR,
  SKILLS_REQUIRED_ERROR,
  START_DATE_REQUIRED_ERROR,
  WEEKLY_EMPLOYMENT_MIN_ERROR,
  WEEKLY_EMPLOYMENT_REQUIRED_ERROR,
  YEARS_OF_EXPERIENCE_MIN_ERROR,
  YEARS_OF_EXPERIENCE_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseSelect from "@/common/components/BaseSelect/BaseSelect";
import BaseTextArea from "@/common/components/BaseTextArea/BaseTextArea";
import BaseTagInput from "@/common/components/BaseTagInput/BaseTagInput";
import { IRequest } from "@/services/request/types";
import { dateService } from "@/services/date/dateService";
import BaseInputGroup from "@/common/components/BaseInputGroup/BaseInputGroup";
import BaseInputRightElement from "@/common/components/BaseInputRightElement/BaseInputRightElement";
import { RequestInputs } from "../../models/RequestInputs";
import { FULL_DATE_FORMAT } from "@/services/date/dateFormats";
import { LOCATIONS } from "@/common/constants/locations";
import { CheckIcon } from "@chakra-ui/icons";

const schema = yup.object().shape({
  rate: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(RATE_REQUIRED_ERROR)
    .min(0, RATE_MIN_ERROR),
  yearsOfExperience: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(YEARS_OF_EXPERIENCE_REQUIRED_ERROR)
    .min(0, YEARS_OF_EXPERIENCE_MIN_ERROR),
  skills: yup.array().required(SKILLS_REQUIRED_ERROR),
  engLevel: yup.string().required(ENG_LEVEL_REQUIRED_ERROR),
  startDate: yup.string().required(START_DATE_REQUIRED_ERROR),
  duration: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(DURATION_REQUIRED_ERROR)
    .min(0, DURATION_MIN_ERROR),
  weeklyEmployment: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(WEEKLY_EMPLOYMENT_REQUIRED_ERROR)
    .min(0, WEEKLY_EMPLOYMENT_MIN_ERROR),
  location: yup.string().required(LOCATION_REQUIRED_ERROR),
  position: yup.string().required(POSITION_REQUIRED_ERROR),
});

interface Props {
  values?: IRequest;
  onSubmit: (values: RequestInputs) => void;
  isLoading: boolean;
}

const CreateRequest: React.FC<Props> = ({ values, onSubmit, isLoading }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<RequestInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: values
      ? {
          rate: values.rate,
          yearsOfExperience: values.yearsOfExperience,
          skills: values.skills,
          engLevel: values.engLevel,
          description: values.description,
          startDate: dateService
            .getDate(values.startDate)
            .format(FULL_DATE_FORMAT),
          duration: values.duration,
          weeklyEmployment: values.weeklyEmployment,
          location: values.location,
          position: values.position,
        }
      : { engLevel: EngLevelEnum.A1 },
  });

  const submit = (values: RequestInputs) => {
    onSubmit(values);
  };

  return (
    <form>
      <BaseFlex gap="1rem" flexDirection="column">
        <BaseFormControl isInvalid={Boolean(errors.rate)}>
          <BaseFormLabel>Rate</BaseFormLabel>
          <BaseInputGroup>
            <BaseInput
              type="number"
              variant="filled"
              placeholder="Enter rate e.g. 40"
              {...register("rate")}
            />
            <BaseInputRightElement>$</BaseInputRightElement>
          </BaseInputGroup>
          <BaseFormErrorMessage>{errors.rate?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.yearsOfExperience)}>
          <BaseFormLabel>Years of experience</BaseFormLabel>

          <BaseInputGroup>
            <BaseInput
              variant="filled"
              type="number"
              placeholder="Enter years of experience"
              {...register("yearsOfExperience")}
            />
            <BaseInputRightElement width="4rem">years</BaseInputRightElement>
          </BaseInputGroup>
          <BaseFormErrorMessage>
            {errors.yearsOfExperience?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.skills)}>
          <BaseFormLabel>Skills</BaseFormLabel>
          <Controller
            name="skills"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseTagInput
                variant="filled"
                placeholder="Enter skill e.g. React"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={Boolean(errors.skills)}
              />
            )}
          />
          <BaseFormErrorMessage>{errors.skills?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.engLevel)}>
          <BaseFormLabel>English Level</BaseFormLabel>
          <BaseSelect variant="filled" {...register("engLevel")}>
            {(
              Object.keys(EngLevelEnum) as Array<keyof typeof EngLevelEnum>
            ).map((key) => (
              <option key={key}>{EngLevelEnum[key]}</option>
            ))}
          </BaseSelect>
          <BaseFormErrorMessage>
            {errors.engLevel?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.description)}>
          <BaseFormLabel>Description</BaseFormLabel>
          <BaseTextArea
            variant="filled"
            placeholder="Enter description"
            {...register("description")}
          />
          <BaseFormErrorMessage>
            {errors.description?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.startDate)}>
          <BaseFormLabel>Approx. start date</BaseFormLabel>
          <BaseInput
            type="date"
            variant="filled"
            placeholder="Enter start date"
            min={dateService.getNow().format(FULL_DATE_FORMAT)}
            {...register("startDate")}
          />
          <BaseButton
            marginTop="0.5rem"
            variant="ghost"
            onClick={() =>
              setValue(
                "startDate",
                dateService.getNow().format(FULL_DATE_FORMAT)
              )
            }
          >
            ASAP
          </BaseButton>
          <BaseFormErrorMessage>
            {errors.startDate?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.duration)}>
          <BaseFormLabel>Approx. min. duration</BaseFormLabel>
          <BaseInputGroup>
            <BaseInput
              type="number"
              variant="filled"
              placeholder="Enter duration"
              {...register("duration")}
            />
            <BaseInputRightElement width="5rem">months</BaseInputRightElement>
          </BaseInputGroup>
          <BaseFormErrorMessage>
            {errors.duration?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.weeklyEmployment)}>
          <BaseFormLabel>Min. weekly employment</BaseFormLabel>
          <BaseInputGroup>
            <BaseInput
              type="number"
              variant="filled"
              placeholder="Enter weekly employment"
              {...register("weeklyEmployment")}
            />
            <BaseInputRightElement width="5rem">hours</BaseInputRightElement>
          </BaseInputGroup>
          <BaseFormErrorMessage>
            {errors.weeklyEmployment?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.location)}>
          <BaseFormLabel>Location</BaseFormLabel>
          <BaseSelect
            variant="filled"
            placeholder="Enter location"
            {...register("location")}
          >
            {LOCATIONS.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </BaseSelect>
          <BaseFormErrorMessage>
            {errors.location?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.position)}>
          <BaseFormLabel>Position</BaseFormLabel>
          <BaseSelect
            variant="filled"
            placeholder="Enter position"
            {...register("position")}
          >
            {(
              Object.keys(PositionEnum) as Array<keyof typeof PositionEnum>
            ).map((key) => (
              <option key={key} value={key}>
                {PositionEnum[key]}
              </option>
            ))}
          </BaseSelect>
          <BaseFormErrorMessage>
            {errors.position?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>
      </BaseFlex>

      <BaseButton
        leftIcon={<CheckIcon />}
        marginTop="2.5rem"
        width="100%"
        isLoading={isLoading}
        onClick={handleSubmit(submit)}
        variant="solid"
      >
        Submit
      </BaseButton>
    </form>
  );
};

export default CreateRequest;
