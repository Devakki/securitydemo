<?php

namespace App\Controller;

use App\Datatables\CustomerDatatable;
use App\Entity\Customer;
use App\Form\CustomerType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sg\DatatablesBundle\Datatable\DatatableFactory;
use Sg\DatatablesBundle\Response\DatatableResponse;

/**
 * @Route("/customer", name="customer_")
 */
class CustomerController extends AbstractController
{
    /**
    * @var DatatableFactory
    */
   protected DatatableFactory $dtFactory;
   /**
    * @var DatatableResponse
    */
   protected DatatableResponse $dtResponse;

    public function __construct(
        EntityManagerInterface $entityManager,        
        DatatableFactory $dtFactory,
        DatatableResponse $dtResponse
        
    ) {
        $this->entityManager  = $entityManager; 
           $this->dtFactory      = $dtFactory;
        $this->dtResponse     = $dtResponse;
    }

    #[Route('/customer', name: 'customer')]
    public function index(Request $request): Response
    {
        $customer = new Customer(); 
        
        $addForm = $this->createForm(CustomerType::class, $customer);
        $addForm->handleRequest($request);
        
        if($addForm->isSubmitted())
        {

          $this->entityManager->persist($customer);
            $this->entityManager->flush();

            return $this->redirectToRoute('dashboard');
        }

         return $this->render('customer/index.html.twig', [
            'form'  => $addForm->createView(),
            'title' => 'Customer',
            'route' => ['list' => 'customer_list'],
        ]);
    }
    #[Route('/customer-list', name: 'customerList')]
    public function customerList(Request $request): Response
    {
        $isAjax   = $request->isXmlHttpRequest();
        $datatable = $this->dtFactory->create(CustomerDatatable::class);
        $datatable->buildDatatable();
       
        if($isAjax){
         
            $this->dtResponse->setDatatable($datatable);
            $this->dtResponse->getDatatableQueryBuilder()->getQb();
            return $this->dtResponse->getResponse();
        }
        return $this->render('customer/list.html.twig', [
            'title'     => 'Customer',
            'route'     => ['add' => 'customer'],
            'datatable' => $datatable,
        ]);
    }
  
    #[Route('/{id}/edit', methods: ['GET', 'POST'], name: 'edit_customer')]
    public function edit(Request $request, Customer $customer): Response
    {
        dd($customer);exit;
        $edit_form = $this->createForm(CustomerType::class, $customer);
        $edit_form->handleRequest($request);

        if ($edit_form->isSubmitted() && $edit_form->isValid()) {
            try {
                $this->entityManager->flush();
                $this->addFlash('success', 'Record updated successfully');
                return $this->redirectToRoute('customerList');
            } catch (\Exception $exception) {
                $this->addFlash('danger', $exception->getMessage());
            }
        }

        return $this->render('admin/customer/index.html.twig', [
            'form'            => $edit_form->createView(),
            'formActionLabel' => 'Edit'
        ]);
    }
}
