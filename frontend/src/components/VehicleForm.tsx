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

type FormData = {
  name: string;
  phone: string;
  models: string[]
  licence: boolean
 }

export default function VehicleForm() {
  const { register, handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  const options = createListCollection({
    items: [
    { id: 1, value: 'mrc', label: 'Mercedes-Benz' },
    { id: 2, value: 'bmw', label: 'BMW' },
    { id: 3, value: '200', label: 'C 200' },
    { id: 4, value: '400', label: 'C 400' },
    { id: 5, value: '500', label: 'C 500' },
    ],
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Palun sisestage enda kontaktandmed ning automargid</h1>
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
                  collection={options}
                  bg="whiteAlpha.700"
                  border={"1px solid black"}
                  aria-labelledby="models-select"
                >
                  <SelectTrigger clearable>
                    <SelectValueText placeholder="Valige mudelid">
                    {() => {
                      if (field.value.length === 1) return options.items.find((item) => item.value === field.value[0])?.label;
                      return `${field.value.length} valitud`;
                    }}
                    </SelectValueText>
                  </SelectTrigger>
                  <SelectContent>
                    {options.items.map((model) => (
                      <SelectItem item={model} key={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
      </FormControl>

      <FormControl>
        <FormLabel id="licence">Kas teil on kehtiv juhiluba:</FormLabel>
        <Checkbox {...register("licence", { required: true})}
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