<?php

namespace App\Form;

use App\Entity\Customer;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CustomerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name',TextType::class, [
                'attr' => ['placeholder' => 'customer name'],
               
                'row_attr' => ['class' => 'col-md-12 form-group']
            ])
            ->add('mobile',TextType::class, [
                'attr' => ['placeholder' => 'mobile'],
                'row_attr' => ['class' => 'col-md-12  form-group']
            ])
            ->add('address',TextType::class, [
                'attr' => ['placeholder' => 'address'],
                'row_attr' => ['class' => 'col-md-12 form-group']
            ])
            ->add('pannumber',TextType::class, [
                'attr' => ['placeholder' => 'pannumber'],
                'row_attr' => ['class' => 'col-md-12  form-group']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Customer::class,

            'allow_extra_fields' => true
        ]);
    }
}
