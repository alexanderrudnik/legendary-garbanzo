import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import countryList from "country-list";

import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import { EngLevelEnum } from "@/common/models/EngLevelEnum";
import { AppDate } from "@/services/date/dateService";
import { PositionEnum } from "@/common/models/PositionEnum";
import {
  DURATION_REQUIRED_ERROR,
  ENG_LEVEL_REQUIRED_ERROR,
  LOCATION_REQUIRED_ERROR,
  POSITION_REQUIRED_ERROR,
  RATE_REQUIRED_ERROR,
  SKILLS_REQUIRED_ERROR,
  START_DATE_REQUIRED_ERROR,
  WEEKLY_EMPLOYMENT_REQUIRED_ERROR,
  YEARS_OF_EXPERIENCE_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseMultiSelect from "@/common/components/BaseMultiSelect/BaseMultiSelect";
import BaseSelect from "@/common/components/BaseSelect/BaseSelect";
import BaseTextArea from "@/common/components/BaseTextArea/BaseTextArea";

const countries = countryList.getData();

interface CreateRequestInputs {
  rate: number;
  yearsOfExperience: number;
  skills: string[];
  engLevel: EngLevelEnum;
  description: string;
  startDate: AppDate;
  duration: number;
  weeklyEmployment: number;
  location: string;
  position: PositionEnum;
}

const schema = yup.object().shape({
  rate: yup.string().required(RATE_REQUIRED_ERROR),
  yearsOfExperience: yup.string().required(YEARS_OF_EXPERIENCE_REQUIRED_ERROR),
  skills: yup.array().required(SKILLS_REQUIRED_ERROR),
  engLevel: yup.string().required(ENG_LEVEL_REQUIRED_ERROR),
  startDate: yup.string().required(START_DATE_REQUIRED_ERROR),
  duration: yup.string().required(DURATION_REQUIRED_ERROR),
  weeklyEmployment: yup.string().required(WEEKLY_EMPLOYMENT_REQUIRED_ERROR),
  location: yup.string().required(LOCATION_REQUIRED_ERROR),
  position: yup.string().required(POSITION_REQUIRED_ERROR),
});

const CreateRequest: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<CreateRequestInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      engLevel: EngLevelEnum.A1,
    },
  });

  const onSubmit = (values: CreateRequestInputs) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex gap="1rem" flexDirection="column">
        <BaseFormControl isInvalid={Boolean(errors.rate)}>
          <BaseFormLabel>Rate (USD)</BaseFormLabel>
          <BaseInput
            type="number"
            variant="filled"
            placeholder="Enter rate e.g. 40"
            {...register("rate")}
          />
          <BaseFormErrorMessage>{errors.rate?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.yearsOfExperience)}>
          <BaseFormLabel>Years of experience</BaseFormLabel>
          <BaseInput
            type="number"
            variant="filled"
            placeholder="Enter years of experience"
            {...register("yearsOfExperience")}
          />
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
              <BaseMultiSelect
                placeholder="Enter skill e.g. React"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                invalid={Boolean(errors.skills)}
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
          <BaseFormLabel>Start date</BaseFormLabel>
          <BaseInput
            type="date"
            variant="filled"
            placeholder="Enter start date"
            {...register("startDate")}
          />
          <BaseFormErrorMessage>
            {errors.startDate?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.duration)}>
          <BaseFormLabel>Duration (months)</BaseFormLabel>
          <BaseInput
            type="number"
            variant="filled"
            placeholder="Enter duration"
            {...register("duration")}
          />
          <BaseFormErrorMessage>
            {errors.duration?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.weeklyEmployment)}>
          <BaseFormLabel>Weekly Employment (hours)</BaseFormLabel>
          <BaseInput
            type="number"
            variant="filled"
            placeholder="Enter weekly employment"
            {...register("weeklyEmployment")}
          />
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
            {countries.map((country) => (
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
              <option key={key}>{PositionEnum[key]}</option>
            ))}
          </BaseSelect>
          <BaseFormErrorMessage>
            {errors.position?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseButton type="submit" variant="solid">
          Submit
        </BaseButton>
      </BaseFlex>
    </form>
  );
};

export default CreateRequest;
