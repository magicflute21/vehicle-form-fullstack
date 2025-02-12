import { useForm, Controller } from "react-hook-form"
import './vehicleform.css';
import { createListCollection, Input  } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Checkbox } from "./ui/checkbox";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select"
import { useCarModels } from "../hooks/useCarModels";

type FormData = {
  name: string;
  phone: string;
  models: string[]
  licence: boolean
 }

export default function VehicleForm() {
  const { options } = useCarModels();
  const { register, handleSubmit, control } = useForm<FormData>();


  const onSubmit = (data: FormData) => console.log(data);


  const getItemStyles = (type: 'brand' | 'series' | 'model') => {
    switch(type) {
      case 'brand':
        return {
          paddingLeft: '8px',
          fontWeight: 'bold',
          color: 'gray.600',
        };
      case 'series':
        return {
          paddingLeft: '16px',
          fontWeight: 'semibold',
          color: 'gray.600',
        };
      case 'model':
        return {
          paddingLeft: '36px',
        };
    }
  };

  const selectOptions = createListCollection({
    items: options,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Palun sisestage enda kontaktandmed ning automargid, millest olete huvitatud</h1>
      <FormControl>
        <FormLabel id="name">Ees- ja perekonnanimi:</FormLabel>
        <Input aria-labelledby="name" {...register("name", { required: true})} />
      </FormControl>
      
      <FormControl>
        <FormLabel id="phone">Kontakttelefon:</FormLabel>
        <Input aria-labelledby="phone" {...register("phone", { required: true})} />
      </FormControl>

      <FormControl>
        <FormLabel id="models-select">Automargid:</FormLabel>
        <Controller
              control={control}
              name="models"
              render={({ field }) => (
                  <SelectRoot
                    multiple
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={selectOptions}
                    bg="whiteAlpha.700"
                    border={"1px solid black"}
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
                          style={getItemStyles(item.type)}
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