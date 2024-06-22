import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCabin } from "../../services/apiCabins";

import toast from "react-hot-toast";

function CreateCabinForm() {
  // o useForm é um hook do react-hook-form que nos permite criar um formulário com validação de forma mais simples. Ele retorna um objeto com várias propriedades e métodos que nos permitem criar um formulário com validação de forma mais simples.
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  //   console.log(errors);

  const queryClient = useQueryClient();

  // o useMutation é um hook do react-query que nos permite fazer uma mutação para criar, atualizar ou deletar dados em uma API. Ele retorna um objeto com várias propriedades e métodos que nos permitem manipular o estado da mutação.
  const { mutate, isLoading: isCreating } = useMutation({
    // mutationFn: newCabin => createCabin(newCabin),
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    // no image: data.image[0] estamos pegando o primeiro item do array de imagens que foi enviado no formulário. Isso é necessário pois a 'key' image após o envio do formulário é um array de imagens
    mutate({ ...data, image: data.image[0] });
    // console.log(data.image[0]);
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* o register é um método do react-hook-form que nos permite registrar um input no formulário. Ele aceita várias propriedades que nos permitem configurar a validação do input. */}
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      {/*
      MANEIRA DE FAZER SEM O COMPONENTE FormRow
      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
        disabled={isCreating}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! a tag button tem um atributo type="reset" que reseta os valores do formulário */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
