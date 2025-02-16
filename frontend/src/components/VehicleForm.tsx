import { useForm, Controller } from "react-hook-form"
import './vehicleform.css';
import { createListCollection, Input  } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage  } from '@chakra-ui/form-control';
import { Checkbox } from "./ui/checkbox";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select"
import { useCarModels } from "../hooks/useCarModels";
import getOptionStyle from "../util/getOptionStyle";

type FormData = {
  name: string;
  phone: string;
  models: string[]
  licence: boolean
 }

export default function VehicleForm() {
  const { options } = useCarModels();
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  const selectOptions = createListCollection({
    items: options,
  })
  console.log('options', options);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Palun sisestage enda kontaktandmed ning automargid, millest olete huvitatud</h1>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel id="name">Ees- ja perekonnanimi:<span className="asterisk">*</span></FormLabel>
        <Input 
        aria-labelledby="name" 
        borderColor={errors.name ? "red.500" : "initial"}
        {...register("name", { 
          required: "Nimi on kohustuslik väli", 
          minLength: {
            value: 2,
            message: "Nimi peab olema vähemalt 2 tähemärki pikk"
          }
        })} 
        />
        <FormErrorMessage style={{ color: 'red' }}>
          {errors.name?.message}
        </FormErrorMessage>
      </FormControl>
      
      <FormControl isInvalid={!!errors.phone}>
        <FormLabel id="phone">Kontakttelefon:<span className="asterisk">*</span></FormLabel>
        <Input 
        aria-labelledby="phone" 
        borderColor={errors.phone ? "red.500" : "initial"}
        {...register("phone", { 
          required: "Telefon on kohustuslik väli",
          pattern: {
            value: /^[0-9]+$/,
            message: "Palun sisestage ainult numbrid"
          }
        })} 
        />
        <FormErrorMessage style={{ color: 'red' }}>
          {errors.phone?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.models}>
        <FormLabel id="models-select">Automargid:<span className="asterisk">*</span></FormLabel>
        <Controller
              control={control}
              name="models"
              rules={{
                required: "Palun valige vähemalt üks automudel",
                validate: (value) => value.length > 0 || "Palun valige vähemalt üks automudel"
              }}
              render={({ field }) => (
                  <SelectRoot
                    multiple
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={selectOptions}
                    bg="whiteAlpha.700"
                    border={errors.models ? "1px solid red" : "1px solid black"}
                    aria-labelledby="models-select"
                  >
                    <SelectTrigger clearable>
                      <SelectValueText placeholder="Valige mudelid">
                      {() => {
                        if (field.value.length === 1) return selectOptions.items.find((item) => item.value === field.value[0])?.label;
                        return `${field.value.length} valitud`;
                      }}
                      </SelectValueText>
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions.items.map((item) => (
                          <SelectItem 
                          item={item} 
                          key={item.value}
                          style={getOptionStyle(item.type)}
                          >
                            {item.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </SelectRoot>
                )
              }
            />
            <FormErrorMessage style={{ color: 'red' }}>{errors.models?.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel id="licence">Kas teil on kehtiv juhiluba:</FormLabel>
        <Checkbox {...register("licence")}
            aria-labelledby="licence"
             _checked={{
              "& .chakra-checkbox__control": { background: "#303030" }
            }}   
            style={{ backgroundColor: '#EDEEE9', width: "fit-content", border: '1px solid black' }}
        />
      </FormControl>
    <button type="submit" className="submit-button">Kinnita</button>
  </form>
  );
}